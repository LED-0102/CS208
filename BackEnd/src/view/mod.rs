mod forms;
mod get_form;
mod profile;

use std::error::Error;
use std::fmt::format;
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
    match res {
        Ok(s) => {
            if !s {
                return HttpResponse::Unauthorized().finish();
            }
        }
        Err(e) => {
            return HttpResponse::BadRequest().body(e);
        }
    }
    return if data.decision {
        let q = format!("UPDATE {} SET approval_status = 'Accepted' WHERE id = {}", &data.form_type, &data.form_id);
        let q = sqlx::query(&q)
            .execute(pool)
            .await;
        match q {
            Ok(_) => {
                HttpResponse::Ok().finish()
            }
            Err(_) => {
                HttpResponse::InternalServerError().finish()
            }
        }
    } else {
        let q = format!("UPDATE {} SET approval_status = 'Rejected' WHERE id = {}", &data.form_type, &data.form_id);
        let q = sqlx::query(&q)
            .execute(pool)
            .await;
        match q {
            Ok(_) => {
                HttpResponse::Ok().finish()
            }
            Err(_) => {
                HttpResponse::InternalServerError().finish()
            }
        }
    }
}