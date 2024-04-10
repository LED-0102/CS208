use actix_web::{HttpResponse, web};
use crate::AppState;
use crate::auth::jwt::JwToken;
use crate::db::structs::UserDb;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct EditUserInfo {
    pub location: String,
    pub room: String,
    pub contact_number: String
}

pub async fn get_profile (jwt: JwToken, app_state: web::Data<AppState>) -> HttpResponse{
    let id = jwt.id;
    let mut resp = match sqlx::query_as("SELECT * from users where id = $1")
        .bind(id)
        .fetch_one(&app_state.pool)
        .await {
        Ok(s) => {
            let user: UserDb = s;
            user
        }
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    };

    resp.password ="".to_string();
    let json_string = serde_json::to_string(&resp).unwrap();
    HttpResponse::Ok().body(json_string)
}

pub async fn edit_profile (jw_token: JwToken, data: web::Data<EditUserInfo>, pool: web::Data<AppState>) -> HttpResponse {
    let id = jw_token.id;
    let query = "UPDATE users SET location = $1, room = $2, contact_number = $3 WHERE id = $4".to_string();
    match sqlx::query(&query)
        .bind(&data.location)
        .bind(&data.room)
        .bind(&data.contact_number)
        .bind(id)
        .execute(&pool.pool)
        .await {
        Ok(_) => {
            HttpResponse::Ok().finish()
        },
        Err(e) => {
            println!("{:?}", e);
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}