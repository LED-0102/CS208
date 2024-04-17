use actix_web::{post, web, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::{Column, Row, TypeInfo};
use crate::{AppState};
use crate::auth::jwt::JwToken;
use serde_json::{Value};

#[derive(Debug, Serialize, Deserialize)]
pub struct Schedule {
    name: String,
    start: String,
    end: String
}

/// This function is used to get the schedule of a lab on a specific date.
pub async fn get_schedule(pool: web::Data<AppState>, path: web::Path<(String, String)>) -> HttpResponse {
    let (lab_name, date) = path.into_inner();
    let query = format!("SELECT schedule FROM {} WHERE today_date = '{}'", lab_name, date);
    let result = sqlx::query(&query)
        .fetch_one(&pool.pool)
        .await;
    match result {
        Ok(row) => {
            match row.try_get::<Value, _>(0) {
                Ok(val) => HttpResponse::Ok().json(val),
                Err(e) => HttpResponse::InternalServerError().body(e.to_string())
            }
        },
        Err(_) => {
            HttpResponse::Ok().json({})
        }
    }
}

/// This function is used to book a schedule for a lab on a specific date.
#[post("/labs/book_schedule/{lab}/{date}")]
pub async fn book_schedule(pool: web::Data<AppState>, path: web::Path<(String, String)>, schedule: web::Json<Schedule>, _jwt: JwToken) -> HttpResponse {
    let (lab_name, date) = path.into_inner();
    let check_query = format!("SELECT * FROM {} WHERE today_date = '{}'", lab_name, date);
    match sqlx::query(&check_query)
        .fetch_all(&pool.pool)
        .await
    {
        Ok(res) => {
            if res.len() == 0 {
                let initial_query = format!("INSERT INTO {} (today_date, schedule) VALUES ('{}', '[]')", lab_name, date);
                println!("{}", initial_query);
                match sqlx::query(&initial_query)
                    .execute(&pool.pool)
                    .await
                {
                    Ok(_) => {},
                    Err(e) => {
                        println!("{:?}", e);
                        return HttpResponse::InternalServerError().body("Error entering initial value");
                    }
                }
            }
        },
        Err(_) => {
            return HttpResponse::InternalServerError().body("Error entering initial value2");
        }
    }
    let insert_query = format!("UPDATE {}
        SET schedule = jsonb_insert(
            schedule,
            '{{-1}}',
            '{{\"name\": \"{}\", \"start\": \"{}\", \"end\": \"{}\"}}',
            true
         )
        WHERE today_date = '{}';", lab_name, &schedule.name, &schedule.start, &schedule.end, date);
    println!("{}",insert_query);
    match sqlx::query(&insert_query)
        .execute(&pool.pool)
        .await 
    {
        Ok(_) => {
            HttpResponse::Ok().json("Entered Successively")
        }
        Err(_) => {
            HttpResponse::InternalServerError().body("Error inserting actual value")
        }
    }
}