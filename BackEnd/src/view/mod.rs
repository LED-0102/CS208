mod forms;

use std::error::Error;
use std::str::FromStr;
use actix_web::{post, web::{self, Data}, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use crate::auth::jwt::JwToken;
use forms::{Forms, FormTrait};
use crate::AppState;
use crate::db::fetch_id::verify_receiver;

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

    );
}

#[post("/submit/{form_type}")]
pub async fn form_handler(jwt: JwToken, form_type: web::Path<String>, form_data: web::Json<Value>, pool: Data<AppState>) -> HttpResponse{
    let form_type = form_type.into_inner();
    let form = match Forms::from_str(&form_type, form_data.into_inner(), &jwt){
        Ok(form) => form,
        Err(e) => {return e;}
    };

    match form.pg_insert(&pool.pool).await {
        Ok(s) => {
            println!("Inserted into db!");
            match form.process(&pool.pool, s, jwt.id).await {
                Ok(_) => {}
                Err(e) => {
                    return HttpResponse::InternalServerError().body(e.to_string());
                }
            }
            HttpResponse::Ok().finish()
        }
        Err(e) => {
            println!("Error inserting into db!");
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
        Err(_) => {
            return HttpResponse::BadRequest().finish();
        }
    }
    return if data.decision {
        let q = sqlx::query("UPDATE $1 SET approval_status = 'Accepted' WHERE id = $2")
            .bind(&data.form_type)
            .bind(&data.form_id)
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
        let q = sqlx::query("UPDATE $1 SET approval_status = 'Rejected' WHERE id = $2")
            .bind(&data.form_type)
            .bind(&data.form_id)
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