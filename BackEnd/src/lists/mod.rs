use actix_web::{web::{Data}, HttpResponse, Responder, web};
use sqlx::{Error, Row};
use crate::db::structs::{Student, Instrument, Receivers, Seeking};

use crate::AppState;
use crate::auth::jwt::JwToken;

pub async fn get_pending(app_state: Data<AppState>, jwt: JwToken) -> HttpResponse {
    let id = jwt.id;
    let result = sqlx::query_as::<_, Seeking>(
        "SELECT seeking FROM users WHERE id = $1"
    ).bind(id)
        .fetch_one(&app_state.pool)
        .await;
    let _ = match result {
        Ok(s) => {s}
        Err(e) => {
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    };
    let todo = sqlx::query("SELECT DISTINCT form from forms;")
        .fetch_all(&app_state.pool)
        .await;
    match todo {
        Ok(_) => {}
        Err(e) => {
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    }
    let p: Vec<String> = todo.unwrap().iter()
        .map(|row| row.get("form"))
        .collect();

    let seeking = sqlx::query("SELECT seeking from users where id=$1")
        .bind(id)
        .fetch_one(&app_state.pool)
        .await;
    //Have some work to do here



    HttpResponse::Ok().finish()
}

pub async fn get_students(app_state: Data<AppState>) -> impl Responder{
    match sqlx::query_as::<_, Student>(
        "SELECT roll_no, student_name, email_id, degree FROM students"
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
    let todo: Result<Vec<Receivers>, Error> = sqlx::query_as("SELECT id, username, designation FROM users")
        .fetch_all(&pool.pool)
        .await;

    match todo {
        Ok(todo) => {
            let json_string = serde_json::to_string(&todo).unwrap();
            HttpResponse::Ok().body(json_string)
        }

        Err(e) => {
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    }

}
pub fn list_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/list")
            .route("/students", web::get().to(get_students))
            .route("/inventory", web::get().to(get_inventory))
            .route("/receiver", web::get().to(get_receiver))
            .route("/pending", web::post().to(get_pending))
    );
}