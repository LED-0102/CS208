use std::fmt::format;
use sqlx::{Error, PgPool, Row};
use sqlx::postgres::PgRow;
use crate::ws::server::Identifier;

pub async fn identifier_id (id: i32, pool: &PgPool) -> Result<Identifier, Box<dyn std::error::Error>> {
    let val = sqlx::query(
        "SELECT username, designation from users where id=$1")
        .bind(&id)
        .fetch_one(pool)
        .await;
    match val {
        Ok(row) => {
            let name = row.get("username");
            let designation = row.get("designation");
            Ok(Identifier{
                name,
                designation,
            })
        }
        Err(e) => {
            Err(Box::try_from(e).unwrap())
        }
    }
}

pub async fn identifier_email (email: &str, pool: &PgPool) -> Identifier{
    let id: Identifier = sqlx::query_as("SELECT (username, designation) FROM users WHERE email = $1")
        .bind(email)
        .fetch_one(pool)
        .await
        .unwrap()
        ;
    id
}

pub async fn verify_receiver (pool: &PgPool, form_id: i32, form_name: &str, receiver_id: i32) -> Result<bool, String> {
    let q = format!("SELECT receiver from {form_name} where id={form_id}");
    let a = sqlx::query(&q)
        .fetch_one(pool)
        .await;
    match a {
        Ok(s) => {
            let receiver: i32 = s.get("receiver");
            if receiver == receiver_id {
                Ok(true)
            } else {
                Ok(false)
            }
        }
        Err(e) => {
            Err(e.to_string())
        }
    }

}