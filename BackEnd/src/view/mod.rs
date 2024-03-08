mod forms;

use std::str::FromStr;
use actix_web::{HttpResponse, post, web};
use serde_json::Value;
use crate::auth::jwt::JwToken;
use forms::{Forms, FormTrait};

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
pub async fn form_handler(jwt: JwToken, form_type: web::Path<String>, form_data: web::Json<Value>) -> HttpResponse{
    let form_type = form_type.into_inner();
    let form = match Forms::from_str(&form_type, form_data.into_inner()){
        Ok(form) => form,
        Err(e) => {return e;}
    };
    //Processing of Forms
    HttpResponse::Ok().finish()
}