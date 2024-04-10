use actix_web::{HttpResponse, web};
use serde::{Deserialize, Serialize};

pub mod login;
pub mod logout;
pub mod register;
pub mod jwt;
use login::login;
use logout::logout;
use register::register;

pub fn auth_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1/auth")
            .route("/register", web::post().to(register))
            .route("/login", web::post().to(login))
            .route("/logout", web::post().to(logout))
            .route("/verify", web::post().to(verify_user))
    );
}

#[derive(Serialize)]
pub struct UserInfo {
    pub username: String,
    pub email: String,
    pub designation: String,
    pub department: String
}
pub async fn verify_user (jwt: JwToken) -> HttpResponse {
    let resp = UserInfo {
        username: jwt.username.clone(),
        email: jwt.email.clone(),
        designation: jwt.designation.clone(),
        department: jwt.department.clone()
    };
    let resp_str = serde_json::to_string(&resp).unwrap();

    HttpResponse::Ok().body(resp_str)
}