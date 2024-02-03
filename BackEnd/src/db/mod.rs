use actix_web::error;
use sqlx::PgPool;
use crate::db::structs::Users;
use crate::ws::server::Identifier;

pub mod structs;
pub mod fetch_id;

pub async fn fetch_identifier (email: &str, pool: &PgPool) -> Identifier{
    let id: Identifier = sqlx::query_as("SELECT (username, designation) FROM users WHERE email = $1")
        .bind(email)
        .fetch(pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string())).unwrap();
    id
}