mod forms;
mod init_list;

use actix_web::{HttpResponse, web};
use crate::auth::jwt::JwToken;

pub struct FormData {
    pub form_type: String,
    pub fields: String
}

pub fn view_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1")
            .route("/submit", web::post().to(form_handler))
    );
}


pub async fn form_handler(_jwt: JwToken) -> HttpResponse{
    HttpResponse::Ok().finish()
}