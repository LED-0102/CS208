use std::collections::HashMap;
use actix_web::{HttpResponse, web};
use actix_web::web::Path;
use serde_json::{json, Value};
use sqlx::{Column, FromRow, Row, TypeInfo};
use crate::AppState;
use crate::auth::jwt::JwToken;
use crate::db::structs::State;
#[derive(FromRow)]
pub struct PendingKeys {
    pending: Vec<i32>
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
            let mut forms_data: HashMap<String, Vec<Value>> = HashMap::new();

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
                        let mut form_data: Vec<Value> = Vec::new();
                        let keys: Vec<i32> = pending_keys_rows.get(0);
                        // Iterate over each pending key
                        for pending_key in keys {
                            // Fetch form data for the current pending key
                            let form_data_query = format!(
                                "SELECT * FROM {} WHERE id = $1",
                                form_name
                            );

                            let form_data_result = sqlx::query(&form_data_query)
                                .bind(pending_key)
                                .fetch_one(&app_state.pool)
                                .await;

                            match form_data_result {
                                Ok(row) => {
                                    let mut json_row = json!({});

                                    // Construct JSON object for form data
                                    for (i, column) in row.columns().iter().enumerate() {
                                        let value = match column.type_info().name() {
                                            "JSONB" => {
                                                match row.try_get::<Value, _>(i) {
                                                    Ok(val) => val,
                                                    Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
                                                }
                                            }
                                            "VARCHAR" => {
                                                match row.try_get::<String, _>(i) {
                                                    Ok(string_value) => Value::String(string_value),
                                                    Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
                                                }
                                            }
                                            "INT4" => {
                                                match row.try_get::<i32, _>(i) {
                                                    Ok(int_value) => Value::Number(serde_json::Number::from(int_value)),
                                                    Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
                                                }
                                            }
                                            "state" => {
                                                // Assuming `State` is your custom enum
                                                match row.try_get::<State, _>(i) {
                                                    Ok(state_value) => Value::String(format!("{:?}", state_value)), // Convert enum variant to string
                                                    Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
                                                }
                                            }
                                            _ => {
                                                return HttpResponse::InternalServerError().body(format!("Unsupported column type: {}", column.type_info().name()));
                                            }
                                        };
                                        json_row[column.name()] = value;
                                    }


                                    form_data.push(json_row);
                                }
                                Err(e) => {
                                    println!("This is the one!");
                                    return HttpResponse::InternalServerError().body(e.to_string());
                                }
                            }
                        }
                        forms_data.insert(form_name, form_data);
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