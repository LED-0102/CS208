use std::error::Error;
use actix_web::{HttpResponse};
use serde::{Serialize, Serializer};
use crate::db::structs::{State, SS04, MM04, SS01, R1, E01, Furniture, Leave,};
use crate::ws::server::{ChatServer, Identifier};
use serde_json::{self, Value, json};
use sqlx::{PgPool, Row};
use crate::auth::jwt::JwToken;
use crate::db::fetch_id::{identifier_id};

///This is the enum which keeps the record of all the forms along with their contents
#[derive(Debug)]
pub enum Forms {
    SS04(SS04),
    MM04(MM04),
    SS01(SS01),
    R1(R1),
    E01(E01),
    Furniture(Furniture),
    Leave(Leave)
}
pub trait FormTrait: Serialize {
    ///This function is used to process the form. It takes in the pool object and the id of the form and returns a Result object.
    async fn process (&self, pool: &PgPool, id: i32) -> Result<(), Box<dyn Error>>;
    ///This function is used to get the Identifier object corresponding to the form. It takes in the pool object and returns a Result object.
    async fn get_identifier (&self, pool: &PgPool) -> Result<Identifier, Box<dyn Error>>;
    ///This function is used to insert the form into the database. It takes in the pool object and returns a Result object.
    async fn pg_insert (&self, pool: &PgPool) -> Result<i32, Box<dyn Error>>;
    ///This function is used to send the form to the WebSocket server. It takes in the server object and the pool object and returns a Result object.
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
    ///This function is used to update the sender and receiver of the form. It takes in the pool object, the id of the form and the form_name and returns a Result object.
    async fn send_recv_update(&self, pool: &PgPool, id: i32, form_name: &str) -> Result<(), Box<dyn Error>> {
        let query = format!("SELECT submitter, receiver FROM {form_name} WHERE id = $1");
        let a = sqlx::query(&query)
            .bind(id)
            .fetch_one(pool)
            .await?;
        println!("Done here");
        let submitter: i32 = a.try_get("submitter")?;
        let receiver: i32 = a.try_get("receiver")?;
        println!("{submitter} {receiver}");

        let data_table = format!("{}_data", form_name);
        println!("{data_table}");
        let update_query = format!("
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM {} WHERE id = {submitter}) THEN
                    UPDATE {}
                    SET seeking = array_append(seeking, {id})
                    WHERE id = {submitter};
                ELSE
                    INSERT INTO {} (id, seeking, pending, previous)
                    VALUES ({submitter}, ARRAY[{id}], ARRAY[]::integer[], ARRAY[]::integer[]);
                END IF;
            END $$;
            ", data_table, data_table, data_table);
        println!("{update_query}");
        let _ = sqlx::query(&update_query)
            .execute(pool)
            .await?;
        println!("Here!");
        let seeking_query = format!("
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM {} WHERE id = {receiver}) THEN
                    UPDATE {}
                    SET pending = array_append(pending, {id})
                    WHERE id = {receiver};
                ELSE
                    INSERT INTO {} (id, seeking, pending, previous)
                    VALUES ({receiver}, ARRAY[]::integer[], ARRAY[{id}], ARRAY[]::integer[]);
                END IF;
            END $$;
            ", data_table, data_table, data_table);

        let _ = sqlx::query(&seeking_query)
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
            },
            Forms::MM04(mm04) => {
                mm04.serialize(serializer)
            },
            Forms::SS01(ss01) => {
                ss01.serialize(serializer)
            },
            Forms::R1(r1) => {
                r1.serialize(serializer)
            },
            Forms::E01(e01) => {
                e01.serialize(serializer)
            },
            Forms::Furniture(f) => {
                f.serialize(serializer)
            },
            Forms::Leave(l) => {
                l.serialize(serializer)
            }
        }
    }
}

impl FormTrait for Forms {

    async fn process(&self, pool: &PgPool, id: i32) -> Result<(), Box<dyn Error>>{
        match self {
            Forms::SS04(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
            Forms::MM04(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
            Forms::SS01(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
            Forms::R1(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
            Forms::E01(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
            Forms::Furniture(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
            Forms::Leave(_) => {
                let _ = self.send_recv_update(pool, id, self.enum_to_str()).await?;
            },
        }
        Ok(())
    }

    async fn get_identifier(&self, pool: &PgPool) -> Result<Identifier, Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let id = identifier_id(ss04.receiver, pool).await;
                id
            },
            Forms::MM04(mm04) => {
                let id = identifier_id(mm04.receiver, pool).await;
                id
            },
            Forms::SS01(ss01) => {
                let id = identifier_id(ss01.receiver, pool).await;
                id
            },
            Forms::R1(r1) => {
                let id = identifier_id(r1.receiver, pool).await;
                id
            },
            Forms::E01(e01) => {
                let id = identifier_id(e01.receiver, pool).await;
                id
            },
            Forms::Furniture(f) => {
                let id = identifier_id(f.receiver, pool).await;
                id
            },
            Forms::Leave(l) => {
                let id = identifier_id(l.receiver, pool).await;
                id
            },
        }
    }

    async fn pg_insert(&self, pool: &PgPool) -> Result<i32, Box<dyn Error>> {
        match self {
            Forms::SS04(ss04) => {
                let result = sqlx::query("INSERT INTO SS04 (
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
                            approval_status
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)
                        RETURNING id;")
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
                    .bind(&State::Pending)
                    .fetch_one(pool)
                    .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            },
            Forms::MM04(mm04) => {
                let result = sqlx::query("
                    INSERT INTO MM04(
                        note,
                        submitter,
                        receiver,
                        quotation_no,
                        date,
                        requester_name,
                        amount,
                        amount_tax,
                        amount_words,
                        name_member,
                        name_convener,
                        designation_member,
                        approval_status,
                        reason
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                    RETURNING id;
                ").bind(&mm04.note)
                  .bind(&mm04.submitter)
                  .bind(&mm04.receiver)
                  .bind(&mm04.quotation_no)
                  .bind(&mm04.date)
                  .bind(&mm04.requester_name)
                  .bind(&mm04.amount)
                  .bind(&mm04.amount_tax)
                  .bind(&mm04.amount_words)
                  .bind(&mm04.name_member)
                  .bind(&mm04.name_convener)
                  .bind(&mm04.designation_member)
                  .bind(&mm04.approval_status)
                  .bind(&mm04.reason)
                  .fetch_one(pool)
                  .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            },
            Forms::SS01(ss01) => {
                let result = sqlx::query("
                    INSERT INTO SS01 (
                        note,
                        submitter,
                        receiver,
                        date,
                        name_of_custodian,
                        department,
                        location,
                        designation,
                        inventory_no,
                        room_no,
                        item_purchase_info,
                        name_head,
                        list_orders,
                        total_amount,
                        supplier_name_address,
                        po_no_date,
                        budget_head_account,
                        challan_no_date,
                        invoice_no_date,
                        invoice_amount,
                        project_no,
                        name_indenter,
                        sign_date_indenter,
                        sign_date_head,
                        approval_status,
                        reason
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
                    RETURNING id;")
                    .bind(&ss01.note)
                    .bind(&ss01.submitter)
                    .bind(&ss01.receiver)
                    .bind(&ss01.date)
                    .bind(&ss01.name_of_custodian)
                    .bind(&ss01.department)
                    .bind(&ss01.location)
                    .bind(&ss01.designation)
                    .bind(&ss01.inventory_no)
                    .bind(&ss01.room_no)
                    .bind(&ss01.item_purchase_info)
                    .bind(&ss01.name_head)
                    .bind(&serde_json::to_value(&ss01.list_orders).unwrap())
                    .bind(&ss01.total_amount)
                    .bind(&ss01.supplier_name_address)
                    .bind(&ss01.po_no_date)
                    .bind(&ss01.budget_head_account)
                    .bind(&ss01.challan_no_date)
                    .bind(&ss01.invoice_no_date)
                    .bind(&ss01.invoice_amount)
                    .bind(&ss01.project_no)
                    .bind(&ss01.name_indenter)
                    .bind(&ss01.sign_date_indenter)
                    .bind(&ss01.sign_date_head)
                    .bind(&ss01.approval_status)
                    .bind(&ss01.reason)
                    .fetch_one(pool)
                    .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        println!("{}", &e.to_string());
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            },
            Forms::R1(r1) => {
                let result = sqlx::query("
                    INSERT INTO R1 (
                        note,
                        submitter,
                        receiver,
                        date,
                        purpose_of_expenditure,
                        name_of_applicant,
                        designation,
                        department,
                        payment_favour,
                        budget_head_expenditure,
                        project_sanction_no,
                        expenditure_head,
                        amount_claimed,
                        recommending_authority_name,
                        approving_authority_name,
                        approval_status,
                        reason
                    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                    RETURNING id;")
                    .bind(&r1.note)
                    .bind(&r1.submitter)
                    .bind(&r1.receiver)
                    .bind(&r1.date)
                    .bind(&r1.purpose_of_expenditure)
                    .bind(&r1.name_of_applicant)
                    .bind(&r1.designation)
                    .bind(&r1.department)
                    .bind(&r1.payment_favour)
                    .bind(&r1.budget_head_expenditure)
                    .bind(&r1.project_sanction_no)
                    .bind(&r1.expenditure_head)
                    .bind(&r1.amount_claimed)
                    .bind(&r1.recommending_authority_name)
                    .bind(&r1.approving_authority_name)
                    .bind(&r1.approval_status)
                    .bind(&r1.reason)
                    .fetch_one(pool)
                    .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            },
            Forms::E01(e01) => {
                let result = sqlx::query("
                    INSERT INTO E01 (
                        note,
                        submitter,
                        receiver,
                        date,
                        employee_id,
                        hod_name,
                        hod_signature_date,
                        jr_name,
                        jr_signature_date,
                        approval_status,
                        reason
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    RETURNING id;")
                    .bind(&e01.note)
                    .bind(&e01.submitter)
                    .bind(&e01.receiver)
                    .bind(&e01.date)
                    .bind(&e01.employee_id)
                    .bind(&e01.hod_name)
                    .bind(&e01.hod_signature_date)
                    .bind(&e01.jr_name)
                    .bind(&e01.jr_signature_date)
                    .bind(&e01.approval_status)
                    .bind(&e01.reason)
                    .fetch_one(pool)
                    .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            },
            Forms::Furniture(f) => {
                let result = sqlx::query("
                    INSERT INTO Furniture (
                        note,
                        submitter,
                        receiver,
                        date,
                        name_indenter,
                        designation,
                        discipline,
                        budget_head,
                        room_no,
                        building,
                        purpose,
                        nature,
                        present_availability,
                        sign_date,
                        approval_status,
                        reason
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                    RETURNING id;")
                    .bind(&f.note)
                    .bind(&f.submitter)
                    .bind(&f.receiver)
                    .bind(&f.date)
                    .bind(&f.name_indenter)
                    .bind(&f.designation)
                    .bind(&f.discipline)
                    .bind(&f.budget_head)
                    .bind(&f.room_no)
                    .bind(&f.building)
                    .bind(&f.purpose)
                    .bind(&f.nature)
                    .bind(&f.present_availability)
                    .bind(&f.sign_date)
                    .bind(&f.approval_status)
                    .bind(&f.reason)
                    .fetch_one(pool)
                    .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            },
            Forms::Leave(l) => {
                let result = sqlx::query("
                    INSERT INTO Leave(
                        note,
                        submitter,
                        receiver,
                        date,
                        leave_reason,
                        start_date,
                        end_date,
                        approval_status,
                        reason
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id;")
                    .bind(&l.note)
                    .bind(&l.submitter)
                    .bind(&l.receiver)
                    .bind(&l.date)
                    .bind(&l.leave_reason)
                    .bind(&l.start_date)
                    .bind(&l.end_date)
                    .bind(&l.approval_status)
                    .bind(&l.reason)
                    .fetch_one(pool)
                    .await;
                match result {
                    Ok(_) => {
                    }
                    Err(e) => {
                        return Err(Box::try_from(e).unwrap());
                    }
                }
                let id: i32 = result.unwrap().try_get("id")?;
                Ok(id)
            }
        }
    }
}

impl Forms {
    ///This function is used to get the Forms enum from the string containing the form data. It takes in the form type, the body of the form and the JwToken object and returns a Result object.
    pub fn from_str(s: &str, mut body: Value, jwt: &JwToken) -> Result<Self, HttpResponse> {
        match s {
            "MM04" => {
                match serde_json::from_value::<MM04>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::MM04(s))
                    }
                    Err(e) => {
                        println!("{:?}", e);
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            "SS04" => {
                match serde_json::from_value::<SS04>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::SS04(s))
                    }
                    Err(e) => {
                        println!("{:?}", e);
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            "SS01" => {
                if let Some(invoice_amount) = body.get_mut("invoice_amount") {
                    // Check if the "invoice_amount" field is a string
                    if let Some(invoice_amount_string) = invoice_amount.as_str() {
                        // Parse the string to an integer
                        if let Ok(invoice_amount_integer) = invoice_amount_string.parse::<i32>() {
                            // Update the JSON object with the integer value
                            *invoice_amount = json!(invoice_amount_integer);
                        }
                    }
                } else {
                    return Err(HttpResponse::BadRequest().body("Missing 'invoice_amount' field"));
                }

                match serde_json::from_value::<SS01>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::SS01(s))
                    }
                    Err(e) => {
                        println!("{:?}", e);
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            "R1" => {
                match serde_json::from_value::<R1>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::R1(s))
                    }
                    Err(_) => {
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            "E01" => {
                match serde_json::from_value::<E01>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::E01(s))
                    }
                    Err(_) => {
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            "Furniture" => {
                match serde_json::from_value::<Furniture>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::Furniture(s))
                    }
                    Err(e) => {
                        println!("{:?}", &e);
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            "Leave" => {
                match serde_json::from_value::<Leave>(body) {
                    Ok(mut s) => {
                        s.submitter = jwt.id;
                        Ok(Forms::Leave(s))
                    }
                    Err(e) => {
                        println!("{:?}", &e);
                        Err(HttpResponse::BadRequest().body("Incompatible structure"))
                    }
                }
            }
            _ => {
                println!("Invalid form type");
                Err(HttpResponse::BadRequest().body("Invalid form type"))
            }
        }

    }
    pub fn enum_to_str(&self) -> &str {
        match self {
            Forms::SS04(_) => {"SS04"},
            Forms::MM04(_) => {"MM04"},
            Forms::SS01(_) => {"SS01"},
            Forms::R1(_) => {"R1"},
            Forms::E01(_) => {"E01"},
            Forms::Furniture(_) => {"Furniture"},
            Forms::Leave(_) => {"Leave"},
        }
    }
}
