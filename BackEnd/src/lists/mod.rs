use actix_web::{web::Data, HttpResponse, Responder, web, error};
use serde_derive::Serialize;
use sqlx::{FromRow};

use crate::AppState;

#[derive(Serialize, FromRow)]
struct Student {
    roll_no: String,
    student_name: String,
    email_id: String,
    degree: String
}

#[derive(Serialize, FromRow)]
struct Instrument {
    instrument_id: String,
    instrument_name: String,
    location: String
}

#[derive(Serialize, FromRow)]
struct Receivers {
    id: String,
    username: String,
    designation: String
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
        web::scope("/list")
            .route("/students", web::get().to(get_students))
            .route("/inventory", web::get().to(get_inventory))
            .route("/receiver", web::get().to(get_receiver))
    );
}