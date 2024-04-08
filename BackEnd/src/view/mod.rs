mod forms;
mod get_form;
mod profile;

use std::error::Error;
use std::str::FromStr;
use actix_web::{post, web::{self, Data}, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use crate::auth::jwt::JwToken;
use forms::{Forms, FormTrait};
use crate::AppState;
use crate::db::fetch_id::verify_receiver;
use get_form::get_form;
use crate::view::profile::get_profile;

#[derive(Deserialize, Debug, Serialize)]
pub struct ApprovalData {
    pub form_id: i32,
    pub form_type: String,
    pub decision: bool,
    pub note: String
}

pub fn view_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1")
            .service(form_handler)
            .service(accept_reject)
            .route("/{form_name}/{form_id}", web::get().to(get_form))
            .route("/profile", web::get().to(get_profile))
    );
}

#[post("/submit/{form_type}")]
pub async fn form_handler(jwt: JwToken, form_type: web::Path<String>, form_data: web::Json<Value>, pool: Data<AppState>) -> HttpResponse{
    println!("Inside for a while!");
    let form_type = form_type.into_inner();
    let form = match Forms::from_str(&form_type, form_data.into_inner(), &jwt){
        Ok(form) => form,
        Err(e) => {return e;}
    };
    println!("Oh reached here!");
    match form.pg_insert(&pool.pool).await {
        Ok(s) => {
            println!("Inserted into db!");
            match form.process(&pool.pool, s).await {
                Ok(_) => {}
                Err(e) => {
                    return HttpResponse::InternalServerError().body(e.to_string());
                }
            }
            HttpResponse::Ok().finish()
        }
        Err(e) => {
            println!("Error inserting into db!");
            println!("{:?}", e);
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}

#[post("/approval")]
pub async fn accept_reject(pool: Data<AppState>, jwt: JwToken, data: web::Json<ApprovalData>) -> HttpResponse {
    let pool = &pool.pool;
    let res = verify_receiver(pool, data.form_id, &data.form_type, jwt.id).await;
    let mut submitter: i32 = 0;
    match res {
        Ok(s) => {
            submitter = s.1;
            if !s.0 {
                return HttpResponse::Unauthorized().finish();
            }
        }
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::BadRequest().body(e);
        }
    }
    let query = format! ("UPDATE {} SET note = $1 WHERE id = $2", &data.form_type);
    match sqlx::query(&query)
        .bind(&data.note)
        .bind(&data.form_id)
        .execute(pool)
        .await {
        Ok(_) => {},
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::BadRequest().body(e.to_string());
        }
    }
    if data.decision {
        let q = format!("UPDATE {} SET approval_status = 'Accepted' WHERE id = $1", &data.form_type);
        let q = sqlx::query(&q)
            .bind(&data.form_id)
            .execute(pool)
            .await;
        match q {
            Ok(_) => {}
            Err(e) => {
                println!("{:?}", e);
                return HttpResponse::InternalServerError().finish();
            }
        }
    } else {
        let q = format!("UPDATE {} SET approval_status = 'Rejected' WHERE id = {}", &data.form_type, &data.form_id);
        let q = sqlx::query(&q)
            .execute(pool)
            .await;
        match q {
            Ok(_) => {}
            Err(e) => {
                println!("{:?}", e);
                return HttpResponse::InternalServerError().finish();
            }
        }
    }
    match add_to_previous(&data, pool, jwt.id, submitter).await {
        Ok(_) => {
            HttpResponse::Ok().finish()
        }
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    }
}
pub async fn add_to_previous (data: &ApprovalData, pool: &sqlx::PgPool, receiver: i32, submitter: i32) -> Result<(), Box<dyn Error>> {
    let query = format! ("UPDATE {}_data
    SET
        pending = ARRAY_REMOVE(source_array, $1),
        previous = ARRAY_APPEND(destination_array, $1)
    WHERE
        id = $2;", &data.form_type);
    sqlx::query(&query)
        .bind(&data.form_id)
        .bind(receiver)
        .execute(pool)
        .await?;

    let query = format! ("UPDATE {}_data
    SET
        seeking = ARRAY_REMOVE(source_array, $1),
        previous = ARRAY_APPEND(destination_array, $1)
    WHERE
        id = $2;", &data.form_type);
    sqlx::query(&query)
        .bind(&data.form_id)
        .bind(submitter)
        .execute(pool)
        .await?;

    Ok(())
}