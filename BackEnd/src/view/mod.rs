mod forms;
mod get_form;
mod profile;
mod labs;

use std::error::Error;
use std::str::FromStr;
use actix_web::{post, web::{self, Data}, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use crate::auth::jwt::JwToken;
use forms::{Forms, FormTrait};
use crate::AppState;
use crate::db::fetch_id::verify_receiver;
use get_form::get_form;
use crate::view::profile::{get_profile, edit_profile};
use self::labs::{get_schedule, book_schedule};

#[derive(Deserialize, Debug, Serialize)]
pub struct ApprovalData {
    pub form_id: i32,
    pub form_type: String,
    pub decision: bool,
    pub note: String
}

/// Configures the routes for the view module in the Actix web server.
///
/// This function is responsible for setting up the routes for the view module. It adds the following routes:
/// - `/submit/{form_type}`: A POST route that handles form submission.
/// - `/approval`: A POST route that handles form approval or rejection.
/// - `/{form_name}/{form_id}`: A GET route that fetches a specific form.
/// - `/profile`: A GET route that fetches the profile of the authenticated user.
/// - `/edit`: A POST route that edits the profile of the authenticated user.
/// - `/labs/get_schedule/{lab_name}/{Date}`: A GET route that fetches the schedule for a specific lab on a specific date.
///
pub fn view_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/v1")
            .service(form_handler)
            .service(accept_reject)
            .service(book_schedule)
            .route("/{form_name}/{form_id}", web::get().to(get_form))
            .route("/profile", web::get().to(get_profile))
            .route("/edit", web::post().to(edit_profile))
            .route("/labs/get_schedule/{lab_name}/{Date}", web::get().to(get_schedule))
    );
}

/// Handles form submission.
///
/// This function is responsible for handling form submission. It takes the form type and form data as arguments, and inserts the form data into the database.
///
/// # Parameters
///
/// - `jwt`: A JSON Web Token (JWT) that contains the authenticated user's ID.
/// - `form_type`: A string that specifies the type of form being submitted.
/// - `form_data`: The form data to be inserted into the database.
/// - `pool`: A shared state object that provides access to the database pool.
///
#[post("/submit/{form_type}")]
pub async fn form_handler(jwt: JwToken, form_type: web::Path<String>, form_data: web::Json<Value>, pool: Data<AppState>) -> HttpResponse{
    println!("Inside for a while!");
    let form_type = form_type.into_inner();
    let form = match Forms::from_str(&form_type, form_data.into_inner(), &jwt){
        Ok(form) => form,
        Err(e) => {return e;}
    };
    println!("Oh reached here!");
    match form.pg_insert(&pool.pool).await {
        Ok(s) => {
            println!("Inserted into db!");
            match form.process(&pool.pool, s).await {
                Ok(_) => {}
                Err(e) => {
                    return HttpResponse::InternalServerError().body(e.to_string());
                }
            }
            HttpResponse::Ok().finish()
        }
        Err(e) => {
            println!("Error inserting into db!");
            println!("{:?}", e);
            HttpResponse::InternalServerError().body(e.to_string())
        }
    }
}

/// Handles form approval or rejection.
///
/// This function is responsible for handling form approval or rejection. It takes the approval data as an argument, and updates the form status in the database.
///
/// # Parameters
///
/// - `pool`: A shared state object that provides access to the database pool.
/// - `jwt`: A JSON Web Token (JWT) that contains the authenticated user's ID.
/// - `data`: The approval data to be used to update the form status.
///
#[post("/approval")]
pub async fn accept_reject(pool: Data<AppState>, jwt: JwToken, data: web::Json<ApprovalData>) -> HttpResponse {
    let pool = &pool.pool;
    let res = verify_receiver(pool, data.form_id, &data.form_type, jwt.id).await;
    let mut submitter: i32 = 0;
    match res {
        Ok(s) => {
            submitter = s.1;
            if !s.0 {
                return HttpResponse::Unauthorized().finish();
            }
        }
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::BadRequest().body(e);
        }
    }
    let query = format! ("UPDATE {} SET note = $1 WHERE id = $2", &data.form_type);
    match sqlx::query(&query)
        .bind(&data.note)
        .bind(&data.form_id)
        .execute(pool)
        .await {
        Ok(_) => {},
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::BadRequest().body(e.to_string());
        }
    }
    if data.decision {
        let q = format!("UPDATE {} SET approval_status = 'Accepted' WHERE id = $1", &data.form_type);
        let q = sqlx::query(&q)
            .bind(&data.form_id)
            .execute(pool)
            .await;
        match q {
            Ok(_) => {}
            Err(e) => {
                println!("{:?}", e);
                return HttpResponse::InternalServerError().finish();
            }
        }
    } else {
        let q = format!("UPDATE {} SET approval_status = 'Rejected' WHERE id = {}", &data.form_type, &data.form_id);
        let q = sqlx::query(&q)
            .execute(pool)
            .await;
        match q {
            Ok(_) => {}
            Err(e) => {
                println!("{:?}", e);
                return HttpResponse::InternalServerError().finish();
            }
        }
    }
    match add_to_previous(&data, pool, jwt.id, submitter).await {
        Ok(_) => {
            HttpResponse::Ok().finish()
        }
        Err(e) => {
            println!("{:?}", e);
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    }
}

/// Updates the `{form_name}_data` tables in the database accordingly.
///
/// This function is responsible for updating the `{form_name}_data` tables in the database. It removes the form ID from the `pending` array and appends it to the `previous` array for the receiver. It also removes the form ID from the `seeking` array and appends it to the `previous` array for the submitter.
///
/// # Parameters
///
/// - `data`: A reference to an `ApprovalData` object that contains the form ID, form type, decision, and note.
/// - `pool`: A reference to a `PgPool` object that provides access to the database pool.
/// - `receiver`: The ID of the receiver.
/// - `submitter`: The ID of the submitter.
///
pub async fn add_to_previous (data: &ApprovalData, pool: &sqlx::PgPool, receiver: i32, submitter: i32) -> Result<(), Box<dyn Error>> {
    let query = format! ("UPDATE {}_data
    SET
        pending = ARRAY_REMOVE(pending, $1),
        previous = ARRAY_APPEND(previous, $1)
    WHERE
        id = $2;", &data.form_type);
    sqlx::query(&query)
        .bind(&data.form_id)
        .bind(receiver)
        .execute(pool)
        .await?;

    let query = format! ("UPDATE {}_data
    SET
        seeking = ARRAY_REMOVE(pending, $1),
        previous = ARRAY_APPEND(previous, $1)
    WHERE
        id = $2;", &data.form_type);
    sqlx::query(&query)
        .bind(&data.form_id)
        .bind(submitter)
        .execute(pool)
        .await?;

    Ok(())
}