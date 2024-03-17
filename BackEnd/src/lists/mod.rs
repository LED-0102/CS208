use actix_web::{web::{Data, Json, Path}, HttpResponse, Responder, web, error};
use serde::{de::value, Deserialize, Serialize};
use serde_json::json;
use sqlx::{FromRow};
use crate::db::structs::{Student, Instrument, Receivers, SS04Orders, SS04, Seeking};

use crate::AppState;

pub async fn get_pending(app_state: Data<AppState>, path: Path<i32>) -> impl Responder{
    let id = path.into_inner();
    let result = match sqlx::query_as::<_, Seeking>(
        "SELECT seeking FROM users WHERE id = $1"
    ).bind(id)
    .fetch_one(&app_state.pool)
    .await
    {
        Ok(res) => res,
        Err(_) => Seeking {data: json!(null)}
    };
    let ss04_primary_keys = result.data["SS04"].as_array().unwrap().clone();
    "to_string"
}

pub async fn get_students(app_state: Data<AppState>) -> impl Responder{
    match sqlx::query_as::<_, Student>(
        "SELECT * FROM students"
    )
        .fetch_all(&app_state.pool)
        .await 
    {
        Ok(students) => HttpResponse::Ok().json(students),
        Err(_) => HttpResponse::NotFound().json("No Students Found!")
    }
}

pub async fn get_inventory(app_state: Data<AppState>) -> impl Responder{
    match sqlx::query_as::<_, Instrument>(
        "SELECT * FROM inventory"
    )
        .fetch_all(&app_state.pool) 
        .await
    {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(_) => HttpResponse::NotFound().json("No Instruments Found!")
    }
}

pub async fn get_receiver(pool: Data<AppState>) -> HttpResponse {
    let todo: Vec<Receivers> = sqlx::query_as("SELECT id, username, designation FROM users")
        .fetch_all(&pool.pool)
        .await
        .map_err(|e| error::ErrorBadRequest(e.to_string())).unwrap();

    let json_string = serde_json::to_string(&todo).unwrap();
    HttpResponse::Ok().body(json_string)
}
pub fn list_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1/list")
            .route("/students", web::get().to(get_students))
            .route("/inventory", web::get().to(get_inventory))
            .route("/receiver", web::get().to(get_receiver))
    );
}