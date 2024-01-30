use actix_web::error::ErrorBadRequest;
use sqlx::{PgPool, Row};

pub async fn fetch_id (table_name: String, pool: &PgPool) -> i32 {
    let id = sqlx::query("SELECT count from id where table_name=$1").bind(&table_name).fetch_one(pool).await.map_err(|e| ErrorBadRequest(e.to_string()));
    let count: i32 = id.unwrap().get(0);
    let _res = sqlx::query("UPDATE id set count=count+1 where table_name=$1").bind(&table_name).execute(pool).await.map_err(|e| ErrorBadRequest(e.to_string()));
    count
}