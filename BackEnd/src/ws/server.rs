use std::collections::{HashMap};
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use rand::rngs::ThreadRng;
use actix::{Actor, Context, Handler, Recipient};
use rand::Rng;
use serde::Serialize;
use sqlx::FromRow;


#[derive(actix_derive::Message)]
#[rtype(result = "()")]
pub struct Message (pub String);

#[derive(actix_derive::Message)]
#[rtype(usize)]
pub struct Connect {
    pub name: String,
    pub designation: String,
    pub addr: Recipient<Message>
}

#[derive(actix_derive::Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub id: usize
}

#[derive(actix_derive::Message)]
#[rtype(result = "()")]
pub struct ClientMessage {
    pub id: usize,
    /// Peer message
    pub msg: String,
    /// Room name
    pub addr: Identifier,
}
#[derive(Debug)]
pub struct Person {
    pub name: String,
    pub designation: String,
    pub addr: Recipient<Message>
}
#[derive(FromRow, Serialize)]
pub struct Identifier {
    pub name: String,
    pub designation: String
}
#[derive(Debug)]
pub struct ChatServer {
    sessions: HashMap<usize, Person>,
    rng: ThreadRng,
    visitor_count: Arc<AtomicUsize>,
}
impl ChatServer {
    fn new (visitor_count: Arc<AtomicUsize>) -> ChatServer{
        ChatServer {
            sessions: HashMap::new(),
            rng: Default::default(),
            visitor_count,
        }
    }
    pub async fn send_message(&self, msg: &str, receiver: &Identifier) {
        for (_key, value) in self.sessions.iter() {
            if value.name == receiver.name && value.designation == receiver.designation {
                let id = &value.addr;
                id.do_send(Message(msg.to_owned()));
            }
        }
    }
}

impl Actor for ChatServer {
    type Context = Context<Self>;
}

impl Handler<Connect> for ChatServer {
    type Result = usize;

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        let id = self.rng.gen::<usize>();
        self.sessions.insert(id, Person {
            name: msg.name,
            designation: msg.designation,
            addr: msg.addr,
        });
        let _count = self.visitor_count.fetch_add(1, Ordering::SeqCst);
        id
    }
}
impl Handler<Disconnect> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _ctx: &mut Self::Context) -> Self::Result {
        self.sessions.remove(&msg.id);
    }
}

impl Handler<ClientMessage> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: ClientMessage, _ctx: &mut Self::Context) -> Self::Result {

        async_io::block_on( async {
            self.send_message(&msg.msg, &msg.addr).await;
        });

    }
}