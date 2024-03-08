use actix_web::error::ErrorBadRequest;
use sqlx::{Error, PgPool, Row};
use crate::ws::server::Identifier;

pub async fn fetch_id (table_name: String, pool: &PgPool) -> i32 {
    let id = sqlx::query("SELECT count from id where table_name=$1").bind(&table_name).fetch_one(pool).await.map_err(|e| ErrorBadRequest(e.to_string()));
    let count: i32 = id.unwrap().get(0);
    let _res = sqlx::query("UPDATE id set count=count+1 where table_name=$1").bind(&table_name).execute(pool).await.map_err(|e| ErrorBadRequest(e.to_string()));
    count
}

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