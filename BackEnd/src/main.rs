mod auth;
mod db;
mod lists;
mod view;
mod ws;

use actix_web::middleware::Logger;
use actix_web::{
    error, get, post,
    web::{self, Json, ServiceConfig},
    Result,
    dev::Service,
};
use serde::{Deserialize, Serialize};
use shuttle_actix_web::ShuttleActixWeb;
use sqlx::{Executor, FromRow, PgPool};
use crate::auth::auth_config;
use crate::ws::ws_config;
use crate::lists::list_config;
use crate::view::view_config;
use actix_cors::Cors;
// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     let database_url = "postgresql://darshil:password@localhost:5432/mems".to_string();
//     let pool = PgPool::connect(&database_url).await.expect("Failed to create pool");
//     let app_state = AppState{
//         pool
//     };
//     HttpServer::new(move || {
//         App::new()
//             .wrap(Cors::default().allow_any_origin().allow_any_method().allow_any_header().supports_credentials())
//             .wrap_fn(|req, srv| {
//                 println!("{} {}", req.method(), req.uri());
//                 let future = srv.call(req);
//                 async {
//                     let result = future.await?;
//                     Ok(result)
//                 }
//             })
//             .configure(auth_config)
//             .configure(view_config)
//             .configure(ws_config)
//             .configure(list_config)
//             .route(
//                 "/",
//                 web::get().to(|| async { HttpResponse::Ok().body("/") }),
//             )
//             .app_data(web::Data::new(app_state.clone()))
//     })
//         .bind(("127.0.0.1", 8080))?
//         .run()
//         .await
// }
#[derive(Clone)]
struct AppState {
    pool: PgPool,
}

#[shuttle_runtime::main]
async fn actix_web(
    #[shuttle_shared_db::Postgres] pool: PgPool,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {

    let state = web::Data::new(AppState { pool });

    let config = move |cfg: &mut ServiceConfig| {
        cfg.service(
            web::scope("/")
                .wrap(Cors::default().allow_any_origin().allow_any_method().allow_any_header().supports_credentials())
                .wrap(Logger::default())
                .wrap_fn(|req, srv| {
                    println!("{} {}", req.method(), req.uri());
                    let future = srv.call(req);
                    async {
                        let result = future.await?;
                        Ok(result)
                    }
                })
                .app_data(state.clone())
                .configure(auth_config)
                .configure(view_config)
                .configure(list_config)
                .configure(ws_config),
        );
    };

    Ok(config.into())
}