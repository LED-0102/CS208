
use sqlx::{ PgPool, Row};
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