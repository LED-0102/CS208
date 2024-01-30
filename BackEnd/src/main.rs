use std::env;
use actix_web::{web, HttpResponse, Responder, HttpServer, App, dev::Service};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};
use sqlx::{Executor, FromRow, PgPool};
mod auth;
pub mod db;
use auth::auth_config;

#[derive(Clone)]
struct AppState {
    pool: Pool<Postgres>
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = "postgresql://darshil:password@localhost:5432/mems".to_string();
    let pool = PgPool::connect(&database_url).await.expect("Failed to create pool");
    let app_state = AppState{
        pool
    };
    HttpServer::new(move || {
        App::new()
            .wrap(Cors::default().allow_any_origin().allow_any_method().allow_any_header())
            .wrap_fn(|req, srv| {
                println!("Hi boi got it {} {}", req.method(), req.uri());
                let future = srv.call(req);
                async {
                    let result = future.await?;
                    Ok(result)
                }
            })
            .configure(auth_config)
            .route(
                "/",
                web::get().to(|| async { HttpResponse::Ok().body("/") }),
            ).app_data(web::Data::new(app_state.clone()))
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}