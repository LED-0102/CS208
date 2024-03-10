use std::error::Error;
use actix_web::{HttpResponse};
use serde::{Serialize, Serializer};
use crate::db::structs::{SS04};
use crate::ws::server::{ChatServer, Identifier};
use serde_json;
use serde_json::Value;
use sqlx::{PgPool};
use crate::auth::jwt::JwToken;
use crate::db::fetch_id::{fetch_id, identifier_id};

pub enum Forms {
    SS04(SS04),
}
pub trait FormTrait: Serialize {
    async fn process (&self);
    async fn get_identifier (&self, pool: &PgPool) -> Result<Identifier, Box<dyn Error>>;
    async fn pg_insert (&self, pool: &PgPool) -> Result<(), Box<dyn Error>>;
    async fn send_form (&self, srv: &mut ChatServer, pool: &PgPool) -> Result<(), Box<dyn Error>>{
        let form_string = serde_json::to_string(&self);
        match form_string {
            Ok(s) => {
                match self.get_identifier(pool).await {
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

    async fn get_identifier(&self, pool: &PgPool) -> Result<Identifier, Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let id = identifier_id(ss04.receiver, pool).await;
                id
            }
        }
    }

    async fn pg_insert(&self, pool: &PgPool) -> Result<(), Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let id = fetch_id("SS04".parse().unwrap(), pool).await;
                let _ = sqlx::query("INSERT INTO SS04 (id, note, submitter, receiver, date, content, hod_approval) VALUES ($1, $2, $3, $4, $5, $6, $7)")
                    .bind(id)
                    .bind(&ss04.note)
                    .bind(&ss04.submitter)
                    .bind(&ss04.receiver)
                    .bind(&ss04.date)
                    .bind(&ss04.content)
                    .bind(&ss04.hod_approval)
                    .execute(pool)
                    .await?;
                Ok(())
            }
        }
    }
}

impl Forms {
    pub fn from_str(s: &str, body: Value, jwt: &JwToken) -> Result<Self, HttpResponse> {
        match s {
            "SS04" => {
                match serde_json::from_value::<SS04>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::SS04(s))
                    }
                    Err(_) => {
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            _ => Err(HttpResponse::BadRequest().body("Invalid form type"))
        }

    }
}