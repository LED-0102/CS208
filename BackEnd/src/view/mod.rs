mod forms;

use actix_web::{HttpResponse, web};
use crate::auth::jwt::JwToken;


pub fn view_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1")
            .route("/test", web::post().to(yo))
    );
}



pub async fn yo (_: JwToken) -> HttpResponse {
    HttpResponse::Ok().finish()
}