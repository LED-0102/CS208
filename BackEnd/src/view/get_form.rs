use actix_web::{HttpResponse, web};
use sqlx::{Column, Row, TypeInfo};
use crate::AppState;
use crate::auth::jwt::JwToken;
use serde_json::{json, Value};
use crate::db::structs::State;


///This function is used to get the form data corresponding to the form name and form id.
pub async fn get_form(pool: web::Data<AppState>, path: web::Path<(String, i32)>, _: JwToken) -> HttpResponse {
    let (form_name, form_id) = path.into_inner();
    let query = format!("SELECT * FROM {} WHERE id = $1", form_name);
    let form = sqlx::query(&query)
        .bind(form_id)
        .fetch_one(&pool.pool)
        .await;
    match form {
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
            HttpResponse::Ok().json(json_row)

        }
        Err(e) => {
            println!("This is the one!");
            return HttpResponse::InternalServerError().body(e.to_string());
        }
    }
}