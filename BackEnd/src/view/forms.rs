use std::error::Error;
use actix_web::{HttpResponse};
use serde::{Serialize, Serializer};
use crate::db::structs::{ SS04};
use crate::ws::server::{ChatServer, Identifier};
use serde_json;
use serde_json::Value;
use sqlx::{PgPool, Row};
use crate::auth::jwt::JwToken;
use crate::db::fetch_id::{identifier_id};

pub enum Forms {
    SS04(SS04),
}
pub trait FormTrait: Serialize {
    async fn process (&self, pool: &PgPool, id: i32) -> Result<(), Box<dyn Error>>;
    async fn get_identifier (&self, pool: &PgPool) -> Result<Identifier, Box<dyn Error>>;
    async fn pg_insert (&self, pool: &PgPool) -> Result<i32, Box<dyn Error>>;
    async fn send_form_ws (&self, srv: &mut ChatServer, pool: &PgPool) -> Result<(), Box<dyn Error>>{
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

    async fn send_recv_update(&self, pool: &PgPool, id: i32, form_name: &str) -> Result<(), Box<dyn Error>> {
        let a = sqlx::query("SELECT submitter, receiver FROM $1 WHERE id=$2")
            .bind(form_name)
            .bind(id)
            .fetch_one(pool)
            .await?;
        let submitter: i32 = a.try_get("submitter")?;
        let receiver: i32 = a.try_get("receiver")?;

        let _ = sqlx::query(r#"UPDATE users
            SET seeking =
                CASE
                    WHEN seeking ? '$1' THEN
                        jsonb_set(seeking, '{$1}', seeking->'$1' || '$2'::jsonb)
                    ELSE
                        '{"$1" : [$2]}'::jsonb
                END
            WHEN id = $3;"#)
            .bind(form_name)
            .bind(id)
            .bind(submitter)
            .execute(pool)
            .await?;

        let _ = sqlx::query(r#"UPDATE users
            SET pending =
                CASE
                    WHEN pending ? '$1' THEN
                        jsonb_set(pending, '{$1}', pending->'$1' || '$2'::jsonb)
                    ELSE
                        '{"$1" : [$2]}'::jsonb
                END
            WHEN id = $3;"#)
            .bind(form_name)
            .bind(id)
            .bind(receiver)
            .execute(pool)
            .await?;
        Ok(())
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

    async fn process(&self, pool: &PgPool, id: i32) -> Result<(), Box<dyn Error>>{
        match self {
            Forms::SS04(f) => {
                let e = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            }
        }
        Ok(())
    }

    async fn get_identifier(&self, pool: &PgPool) -> Result<Identifier, Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let id = identifier_id(ss04.receiver, pool).await;
                id
            }
        }
    }

    async fn pg_insert(&self, pool: &PgPool) -> Result<i32, Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let result = sqlx::query(
                    "INSERT INTO SS04 (
                            note,
                            submitter,
                            receiver,
                            date,
                            custodian,
                            department,
                            location,
                            contact,
                            designation,
                            inventory_no,
                            room_no,
                            email,
                            items_receiving_date,
                            list_orders,
                            total_amount,
                            name_indenter,
                            sign_date_indenter,
                            name_head,
                            sign_date_head,
                            issued_approved_name,
                            issued_approved_date,
                            items_received_name,
                            items_received_date,
                            items_issued_name,
                            items_issued_date,
                            action_ledger_name,
                            action_ledger_date,
                            hod_approval
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)
                        RETURNING id",
                                )
                    .bind(&ss04.note)
                    .bind(&ss04.submitter)
                    .bind(&ss04.receiver)
                    .bind(&ss04.date)
                    .bind(&ss04.custodian)
                    .bind(&ss04.department)
                    .bind(&ss04.location)
                    .bind(&ss04.contact)
                    .bind(&ss04.designation)
                    .bind(&ss04.inventory_no)
                    .bind(&ss04.room_no)
                    .bind(&ss04.email)
                    .bind(&ss04.items_receiving_date)
                    .bind(&serde_json::to_value(&ss04.list_orders).unwrap()) // Assuming ss04.list_orders is a serde_json::Value
                    .bind(&ss04.total_amount)
                    .bind(&ss04.name_indenter)
                    .bind(&ss04.sign_date_indenter)
                    .bind(&ss04.name_head)
                    .bind(&ss04.sign_date_head)
                    .bind(&ss04.issued_approved_name)
                    .bind(&ss04.issued_approved_date)
                    .bind(&ss04.items_received_name)
                    .bind(&ss04.items_received_date)
                    .bind(&ss04.items_issued_name)
                    .bind(&ss04.items_issued_date)
                    .bind(&ss04.action_ledger_name)
                    .bind(&ss04.action_ledger_date)
                    .bind(&ss04.hod_approval)
                    .fetch_one(pool)
                    .await?;


                let id: i32 = result.try_get("id")?;
                println!("{id}");
                Ok(id)
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
    pub fn enum_to_str(&self) -> &str {
        match self {
            Forms::SS04(_) => {"SS04"}
        }
    }
}