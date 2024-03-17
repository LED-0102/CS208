mod forms;

use std::error::Error;
use std::str::FromStr;
use actix_web::{post, web::{self, Data}, HttpResponse};
use serde_json::Value;
use sqlx::query;
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
            .service(accept_ss04)
            .service(reject_ss04)
    );
}

#[post("/ss04_accept/{user_id}/{primary_key}")]
pub async fn accept_ss04(app_state: Data<AppState>, path: web::Path<(i32, i32)>) -> HttpResponse{
    let (user_id, primary_key) = path.into_inner();
    match sqlx::query("
        UPDATE SS04 SET hod_approval = 'Accepted' WHERE id = &1;
        UPDATE users
        SET seeking = jsonb_set(seeking, '{SS04}', ((seeking -> 'SS04') #- \"{$2}\"))
        WHERE id = $3;
        UPDATE users
        SET previous = 
            CASE
                WHEN seeking ? 'SS04' THEN
                    jsonb_set(seeking, '{SS04}', seeking->'SS04' || '$4'::jsonb)
                ELSE
                    '{\"SS04\" : [&5]}'::jsonb
            END
        WHERE id = &6;
    ")
        .bind(primary_key)
        .bind(primary_key)
        .bind(user_id)
        .bind(primary_key)
        .bind(primary_key)
        .bind(user_id)
        .execute(&app_state.pool)
        .await
    {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error accepting SS04 from")
    }
}

#[post("/ss04_reject/{user_id}/{primary_key}")]
pub async fn reject_ss04(app_state: Data<AppState>, path: web::Path<(i32, i32)>) -> HttpResponse{
    let (user_id, primary_key) = path.into_inner();
    match sqlx::query("
        UPDATE SS04 SET hod_approval = 'Rejected' WHERE id = &1;
        UPDATE users
        SET seeking = jsonb_set(seeking, '{SS04}', ((seeking -> 'SS04') #- \"{$2}\"))
        WHERE id = $3;
        UPDATE users
        SET previous = 
            CASE
                WHEN seeking ? 'SS04' THEN
                    jsonb_set(seeking, '{SS04}', seeking->'SS04' || '$4'::jsonb)
                ELSE
                    '{\"SS04\" : [&5]}'::jsonb
            END
        WHERE id = &6;
    ")
        .bind(primary_key)
        .bind(primary_key)
        .bind(user_id)
        .bind(primary_key)
        .bind(primary_key)
        .bind(user_id)
        .execute(&app_state.pool)
        .await
    {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().body("Error accepting SS04 from")
    }
}

#[post("/submit/{form_type}")]
pub async fn form_handler(jwt: JwToken, form_type: web::Path<String>, form_data: web::Json<Value>, pool: web::Data<AppState>) -> HttpResponse{
    let form_type = form_type.into_inner();
    let form = match Forms::from_str(&form_type, form_data.into_inner(), &jwt){
        Ok(form) => form,
        Err(e) => {return e;}
    };

    match form.pg_insert(&pool.pool).await {
        Ok(_) => {
            HttpResponse::Ok().finish()
        }
        Err(_) => {
            HttpResponse::InternalServerError().body("Error inserting SS04 to the database")
        }
    }
}