use actix_web::{web::Data, HttpResponse, Responder, web};
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
pub fn list_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/")
            .route("/students", web::get().to(get_students))
            .route("/inventory", web::get().to(get_inventory))
    );
}