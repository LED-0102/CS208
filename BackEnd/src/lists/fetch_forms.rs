use std::collections::HashMap;
use actix_web::{HttpResponse, web};
use actix_web::web::Path;
use serde::Serialize;
use sqlx::{Error, FromRow, Row};
use crate::AppState;
use crate::auth::jwt::JwToken;
use crate::db::structs::State;

#[derive(FromRow)]
pub struct PendingKeys {
    pending: Vec<i32>
}

#[derive(Serialize, FromRow)]
pub struct ResData {
    id: i32,
    submitter: String,
    receiver: String,
    approval_status: State
}

pub async fn get_pending(app_state: web::Data<AppState>, jwt: JwToken, fetch_type: Path<String>) -> HttpResponse {
    let id = jwt.id;
    let fetch_type = fetch_type.into_inner();
    // Fetch all forms
    let forms_result = sqlx::query("SELECT DISTINCT form FROM forms")
        .fetch_all(&app_state.pool)
        .await;

    match forms_result {
        Ok(forms) => {
            println!("main inside");
            let mut forms_data: HashMap<String, Vec<ResData>> = HashMap::new();

            // Iterate over each form
            for form_row in forms {
                let form_name: String = form_row.get("form");

                // Fetch pending keys for the current user and form
                let pending_keys_query = format!("SELECT {} FROM {}_data WHERE id = $1", &fetch_type, &form_name);
                println!("{pending_keys_query}");
                let pending_keys_result = sqlx::query(&pending_keys_query)
                    .bind(id)
                    .fetch_one(&app_state.pool)
                    .await;

                match pending_keys_result {
                    Ok(pending_keys_rows) => {
                        let keys: Vec<i32> = pending_keys_rows.get(0);
                        for i in keys {
                            let query = format!("SELECT id, \
                              (SELECT username from users where id=submitter) AS submitter,\
                              (SELECT username from users where id=receiver) AS receiver, \
                              approval_status FROM {} WHERE id = $1", &form_name);
                            let res: Result<ResData, Error> = sqlx::query_as(&query)
                                .bind(i)
                                .fetch_one(&app_state.pool)
                                .await;
                            match res {
                                Ok(row) => {
                                    forms_data.entry(form_name.clone()).or_insert(vec![]).push(row);
                                }
                                Err(e) => {
                                    println!("{:?}", e);
                                    continue;
                                }

                            }
                        }
                    }
                    Err(e) => {
                        println!("{:?}", e);
                        continue;
                    }
                }
            }
            HttpResponse::Ok().json(forms_data)
        }
        Err(e) => {
            println!("No no no");
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    }
}