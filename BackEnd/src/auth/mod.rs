use actix_web::web;
use serde::{Deserialize, Serialize};

pub mod login;
pub mod logout;
pub mod register;
pub mod jwt;
use login::login;
use logout::logout;
use register::register;

///It lists all the routes of the auth module. There are 4 routes:
/// 1. /register
/// 2. /login
/// 3. /logout
pub fn auth_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1/auth")
            .route("/register", web::post().to(register))
            .route("/login", web::post().to(login))
            .route("/logout", web::post().to(logout))
    );
}

#[derive(Serialize)]
pub struct UserInfo {
    pub username: String,
    pub email: String,
    pub designation: String,
    pub department: String
}