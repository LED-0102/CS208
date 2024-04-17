mod fetch_forms;

use actix_web::{web::{Data}, HttpResponse, Responder, web};
use sqlx::{Error};
use crate::db::structs::{Student, Instrument, Receivers};

use crate::AppState;
use crate::auth::jwt::JwToken;
use crate::lists::fetch_forms::get_pending;

pub async fn get_students(app_state: Data<AppState>, _: JwToken) -> impl Responder{
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

pub async fn get_inventory(app_state: Data<AppState>, _: JwToken) -> impl Responder{
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
///This function is used to fetch all the possible receivers of the forms, so the form sender can choose who to send
pub async fn get_receiver(pool: Data<AppState>, _: JwToken) -> HttpResponse {
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

/// Configures the routes for the list module in the Actix web server.
///
/// This function is responsible for setting up the routes for the list module. It adds the following routes:
/// - `/students`: A GET route that returns a list of all students.
/// - `/inventory`: A GET route that returns a list of all items in the inventory.
/// - `/receiver`: A GET route that returns a list of all possible receivers of the forms.
/// - `/forms/{fetch_type}`: A GET route that returns a list of forms based on the fetch type.
///
pub fn list_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/list")
            .route("/students", web::get().to(get_students))
            .route("/inventory", web::get().to(get_inventory))
            .route("/receiver", web::get().to(get_receiver))
            .route("/forms/{fetch_type}", web::get().to(get_pending))
    );
}