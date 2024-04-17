pub mod auth;
pub mod db;
pub mod lists;
pub mod view;
pub mod ws;

use actix_web::middleware::Logger;
use actix_web::{web::{self, ServiceConfig}, dev::Service, HttpResponse};
use serde::{Deserialize, Serialize};
use shuttle_actix_web::ShuttleActixWeb;
use sqlx::{Executor, FromRow, PgPool};
use crate::auth::auth_config;
use crate::ws::ws_config;
use crate::lists::list_config;
use crate::view::view_config;
use actix_cors::Cors;
use std::fs::File;
use std::io::Read;

///This struct stores the database connection pool, which can be used by rest of the server
#[derive(Clone)]
struct AppState {
    pool: PgPool,
}

async fn execute_queries_from_file(pool: &PgPool, filename: &str) -> Result<(), sqlx::Error> {
    // Read SQL file
    let mut file = File::open(filename)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    // Split queries by delimiter (;)
    let queries: Vec<&str> = contents.split(';').collect();

    // Execute each query
    for query in queries {
        let trimmed_query = query.trim();
        if !trimmed_query.is_empty() {
            sqlx::query(trimmed_query).execute(pool).await?;
        }
    }

    Ok(())
}

/// This is the main function and is responsible for setting up the Actix web server.
///
/// It takes a `PgPool` as an argument, which is used to interact with the PostgreSQL database.
///
/// The function returns a `ShuttleActixWeb` object, which is used to start the Actix web server.
///
/// # Examples
///
/// ```
/// let pool = PgPool::new("postgres://localhost/test");
/// let server = actix_web(pool);
/// ```
///
/// # Panics
///
/// The function will panic if it fails to connect to the PostgreSQL database.
///
/// # Errors
///
/// This function will return an error if it fails to start the Actix web server.
///
/// # Safety
///
/// This function is safe to call as long as the provided `PgPool` is valid and the database is accessible.
#[shuttle_runtime::main]
async fn actix_web(
    #[shuttle_shared_db::Postgres] pool: PgPool,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    match execute_queries_from_file(&pool, "./schema.sql").await {
        Ok(_) => {}
        Err(e) => {
            println!("{}", e.to_string());
        }
    }
    println!("Database migration successful");
    let state = web::Data::new(AppState { pool });

    let config = move |cfg: &mut ServiceConfig| {
        cfg.service(
            web::scope("")
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
                .configure(ws_config)
                .route("/", web::get().to(|| async { HttpResponse::Ok().body("Hello WOld!") })),
        );
    };

    Ok(config.into())
}