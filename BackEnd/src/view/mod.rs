mod forms;

use std::error::Error;
use std::str::FromStr;
use actix_web::{HttpResponse, post, web};
use serde_json::Value;
use crate::auth::jwt::JwToken;
use forms::{Forms, FormTrait};
use crate::AppState;

pub struct FormData {
    pub form_type: String,
    pub fields: String
}

pub fn view_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1")
            .service(form_handler)
    );
}

#[post("/submit/{form_type}")]
pub async fn form_handler(jwt: JwToken, form_type: web::Path<String>, form_data: web::Json<Value>, pool: web::Data<AppState>) -> HttpResponse{
    println!("Got here!");
    let form_type = form_type.into_inner();
    let form = match Forms::from_str(&form_type, form_data.into_inner(), &jwt){
        Ok(form) => form,
        Err(e) => {return e;}
    };

    match form.pg_insert(&pool.pool).await {
        Ok(s) => {
            form.process().await;
            HttpResponse::Ok().finish()
        }
        Err(e) => {
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}