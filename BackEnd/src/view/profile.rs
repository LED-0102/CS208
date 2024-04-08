use actix_web::{HttpResponse, web};
use crate::AppState;
use crate::auth::jwt::JwToken;
use crate::db::structs::UserDb;

pub async fn get_profile (jwt: JwToken, app_state: web::Data<AppState>) -> HttpResponse{
    let id = jwt.id;
    let resp = match sqlx::query_as("SELECT * from users where id = $1")
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
    let json_string = serde_json::to_string(&resp).unwrap();
    HttpResponse::Ok().body(json_string)
}