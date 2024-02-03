use std::time::Instant;
use actix::Addr;
use actix_web::{Error, HttpRequest, HttpResponse, web};
use actix_web_actors::ws;
use crate::AppState;
use crate::auth::jwt::JwToken;
use crate::db::fetch_identifier;

pub mod session;
pub mod server;

pub fn ws_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/ws")
            .route("/", web::get().to(chat_route))
    );
}

pub async fn chat_route(
    req: HttpRequest,
    stream: web::Payload,
    srv: web::Data<Addr<server::ChatServer>>,
    jwt: JwToken,
    pool: web::Data<AppState>
) -> Result<HttpResponse, Error> {
    let id = fetch_identifier(&jwt.email, &pool.pool).await;
    ws::start(
        session::WsSession {
            id: 0,
            hb: Instant::now(),
            name: id.name,
            addr: srv.get_ref().clone(),
            designation: id.designation,
        },
        &req,
        stream,
    )
}