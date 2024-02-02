use actix_web::web::{resource, scope};
use actix_web::{web, HttpResponse, Responder, HttpServer, App, dev::Service};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};
use sqlx::{Executor, FromRow, PgPool};
mod auth;
pub mod db;
pub mod view;
mod lists;

use auth::auth_config;
use lists::{get_students, get_inventory};
use crate::view::view_config;

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
            .wrap(Cors::default().allow_any_origin().allow_any_method().allow_any_header().supports_credentials())
            .wrap_fn(|req, srv| {
                println!("{} {}", req.method(), req.uri());
                let future = srv.call(req);
                async {
                    let result = future.await?;
                    Ok(result)
                }
            })
            .configure(auth_config)
            .configure(view_config)
            .route("/",web::get().to(|| async { HttpResponse::Ok().body("/") }))
            .service(
                scope("/v1")
                    .service(
                        resource("/students")
                            .route(web::get().to(get_students))
                    )
                    .service(
                        resource("/inventory")
                            .route(web::get().to(get_inventory))
                    )
            )
            .app_data(web::Data::new(app_state.clone()))
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}