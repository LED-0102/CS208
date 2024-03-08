use std::error::Error;
use std::str::FromStr;
use actix_web::{HttpResponse, web};
use serde::{Serialize, Serializer};
use crate::db::structs::{SS04};
use crate::ws::server::{ChatServer, Identifier};
use serde_json;
use serde_json::Value;
use sqlx::{PgPool, Pool, Postgres};
use sqlx::types::Json;
use crate::AppState;
use crate::db::fetch_id::identifier_id;

pub enum Forms {
    SS04(SS04),
}
pub trait FormTrait: Serialize {
    async fn process (&self);
    async fn get_identifier (&self, pool: &Pool<Postgres>) -> Result<Identifier, Box<dyn Error>>;
    async fn send_form (&self, srv: web::Data<ChatServer>, pool: web::Data<AppState>) -> Result<(), Box<dyn Error>>{
        let form_string = serde_json::to_string(&self);
        match form_string {
            Ok(s) => {
                match self.get_identifier(&pool.pool).await {
                    Ok(id) => {
                        srv.send_message(&s, &id).await;
                    }
                    Err(e) => {
                        return Err(e);
                    }
                }
                Ok(())
            }
            Err(e) => {
                Err(Box::try_from(e).unwrap())
            }
        }
    }
}

impl Serialize for Forms {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: Serializer {
        match self {
            Forms::SS04(ss04) => {
                ss04.serialize(serializer)
            }
        }
    }
}

impl FormTrait for Forms {

    async fn process(&self) {
        match self {
            Forms::SS04(_) => {}
        }
    }

    async fn get_identifier(&self, pool: &Pool<Postgres>) -> Result<Identifier, Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let id = identifier_id(ss04.receiver, pool).await;
                id
            }
        }
    }
}

impl Forms {
    pub fn from_str(s: &str, body: Value) -> Result<Self, HttpResponse> {
        match s {
            "SS04" => {
                match serde_json::from_value::<SS04>(body) {
                    Ok(s) => {
                        Ok(Forms::SS04(s))
                    }
                    Err(e) => {
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            _ => Err(HttpResponse::BadRequest().body("Invalid form type"))
        }

    }
}