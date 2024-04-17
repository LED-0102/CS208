mod fetch_forms;

use actix_web::{post, web::{self, Data}, HttpResponse};
use sqlx::{Error, Row};
use crate::{auth::jwt::{self, JwToken}, db::structs::{Desig, Instrument, Receivers, Student}};

use crate::AppState;
use crate::lists::fetch_forms::get_pending;

#[post("/students/create_student")]
pub async fn create_students(pool: web::Data<AppState>, student : web::Json<Student>, jwt: JwToken) -> HttpResponse{
    let user_query = format!("SELECT designation FROM users WHERE id = {}", jwt.id);
    let user_result = sqlx::query(&user_query)
        .fetch_one(&pool.pool)
        .await;
    match user_result {
        Ok(row) => {
            match row.try_get::<Desig,_>(0){
                Ok(designation) =>{
                    if(designation != Desig::Office){
                        return HttpResponse::Unauthorized().body("You Are Not Authorized to add students.");
                    }
                },
                Err(_) => {
                    return HttpResponse::InternalServerError().body("Error in finding user designation");
                }
            }
        },
        Err(_) => {
            return HttpResponse::InternalServerError().body("Error in finding user designation");
        }
    };
    let insert_query = format!("INSERT INTO students (roll_no, student_name, email_id, batch, degree) VALUES ('{}', '{}', '{}', '{}', '{}')", 
        student.roll_no, student.student_name, student.email_id, student.batch, student.degree);
    let insert_result = sqlx::query(&insert_query)
        .execute(&pool.pool)
        .await;
    match insert_result {
        Ok(_) => HttpResponse::Ok().body("Inserted Successively"),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string())
    }
}

pub async fn get_students(pool: web::Data<AppState>, path: web::Path<(String, String)>, jwt: JwToken) -> HttpResponse{
    let (degree, batch) = path.into_inner();
    let query = format!("SELECT roll_no, student_name, email_id, batch, degree FROM students
                                 WHERE batch = '{}' AND degree = '{}'", batch, degree);
    let result = sqlx::query_as::<_, Student>(&query)
        .fetch_all(&pool.pool)
        .await;
    match result {
        Ok(students) => HttpResponse::Ok().json(students),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string())
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
            .service(create_students)
            .route("/students/get_students/{Degree}/{Batch}", web::get().to(get_students))
            // .route("/inventory", web::get().to(get_inventory))
            .route("/receiver", web::get().to(get_receiver))
            .route("/forms/{fetch_type}", web::get().to(get_pending))
    );
}