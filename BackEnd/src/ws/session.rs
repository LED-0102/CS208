use std::time::{Duration, Instant};
use actix::{Actor, ActorContext, ActorFutureExt, Addr, AsyncContext, ContextFutureSpawner, fut, Running, StreamHandler, WrapFuture};
use actix_web_actors::ws;
use actix_web_actors::ws::{ProtocolError};
use crate::ws::server::{self, ChatServer, Disconnect, Connect, ClientMessage, Identifier};

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

#[derive(Debug)]
pub struct WsSession {
    pub id: usize,
    pub hb: Instant,
    pub addr: Addr<ChatServer>,
    pub name: String,
    pub designation: String
}

impl WsSession {
    fn hb(&self, ctx: &mut ws::WebsocketContext<Self>) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            // check client heartbeats
            if Instant::now().duration_since(act.hb) > CLIENT_TIMEOUT {
                // heartbeat timed out
                println!("Websocket Client heartbeat failed, disconnecting!");

                // notify chat server
                act.addr.do_send(Disconnect { id: act.id });

                // stop actor
                ctx.stop();

                // don't try to send a ping
                return;
            }

            ctx.ping(b"");
        });
    }
}

impl Actor for WsSession {
    type Context = ws::WebsocketContext<Self>;
    fn started(&mut self, ctx: &mut Self::Context) {
        // we'll start heartbeat process on session start.
        self.hb(ctx);

        // register self in chat server. `AsyncContext::wait` register
        // future within context, but context waits until this future resolves
        // before processing any other events.
        // HttpContext::state() is instance of WsChatSessionState, state is shared
        // across all routes within application
        let addr = ctx.address();
        self.addr
            .send(Connect {
                name: self.name.clone(),
                designation: self.designation.clone(),
                addr: addr.recipient(),
            })
            .into_actor(self)
            .then(|res, act, ctx| {
                match res {
                    Ok(res) => act.id = res,
                    _ => ctx.stop(),
                }
                fut::ready(())
            })
            .wait(ctx);
    }

    fn stopping(&mut self, _: &mut Self::Context) -> Running {
        // notify chat server
        self.addr.do_send(Disconnect { id: self.id });
        Running::Stop
    }
}

impl actix::Handler<server::Message> for WsSession {
    type Result = ();

    fn handle(&mut self, msg: server::Message, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

impl StreamHandler<Result<ws::Message, ProtocolError>> for WsSession {
    fn handle(&mut self, item: Result<ws::Message, ProtocolError>, ctx: &mut Self::Context) {
        let msg = match item {
            Err(_) => {
                ctx.stop();
                return;
            }
            Ok(msg) => msg
        };

        match msg {
            ws::Message::Ping(p) => {
                self.hb = Instant::now();
                ctx.pong(&p);
            }
            ws::Message::Pong(_p) => {
                self.hb = Instant::now();
            }
            ws::Message::Text(msg) => {
                let m = msg.trim();
                self.addr.do_send(ClientMessage {
                    id: self.id,
                    msg: m.to_string(),
                    addr: Identifier {
                        name: self.name.clone(),
                        designation: self.designation.clone(),
                    },
                })
            }
            ws::Message::Binary(_) => println!("Unexpected binary"),
            ws::Message::Close(reason) => {
                ctx.close(reason);
                ctx.stop();
            }
            ws::Message::Continuation(_) => {
                ctx.stop();
            }
            _ => (),
        }
    }
}