use actix_web::error;
use futures::TryStreamExt;
use sqlx::PgPool;
use crate::ws::server::Identifier;

pub mod structs;
pub mod fetch_id;

pub async fn fetch_identifier (email: &str, pool: &PgPool) -> Identifier{
    let id: Identifier = sqlx::query_as("SELECT (username, designation) FROM users WHERE email = $1")
        .bind(email)
        .fetch_one(pool)
        .await
        .unwrap()
        ;
    id
}