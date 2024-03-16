use std::str::FromStr;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Type};


#[derive(Serialize, Deserialize, FromRow)]
pub struct Users {
    pub(crate) password: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct SS04Orders {
    pub supplier: String,
    pub bill: String,
    pub and_date: String, // Assuming the date could be null
    pub item: String,
    pub quantity: i32,
    pub con_n_con: String,
    pub unit_price: i32,
    pub total: i32,
}
#[derive(Debug, PartialEq, Eq, Type, Deserialize, Serialize)]
pub enum HodApproval {
    Pending,
    Accepted,
    Rejected
}
#[derive(Debug, PartialEq, Eq, Type, Deserialize, Serialize, Clone)]
pub enum Desig {
    HOD,
    Faculty,
    Staff,
    Student,
    Office
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SS04 {
    pub note: String,
    pub submitter: i32,
    pub receiver: i32,
    pub date: String, // Assuming the date could be null
    pub items_receiving_date: String, // Assuming the date could be null
    pub list_orders: Vec<SS04Orders>,
    pub total_amount: i32,
    pub name_indenter: String,
    pub sign_date_indenter: String, // Assuming the date could be null
    pub name_head: String,
    pub sign_date_head: String, // Assuming the date could be null
    pub issued_approved_name: String,
    pub issued_approved_date: String, // Assuming the date could be null
    pub items_received_name: String,
    pub items_received_date: String,
    pub items_issued_name: String,
    pub items_issued_date: String, // Assuming the date could be null
    pub action_ledger_name: String,
    pub action_ledger_date: String, // Assuming the date could be null
    pub hod_approval: HodApproval,
}
impl SS04 {
    pub fn default() -> Self {
        SS04{
            note: "".to_string(),
            submitter: 0,
            receiver: 0,
            date: "".to_string(),

            items_receiving_date: "".to_string(),
            list_orders: vec![],
            total_amount: 0,
            name_indenter: "".to_string(),
            sign_date_indenter: "".to_string(),
            name_head: "".to_string(),
            sign_date_head: "".to_string(),
            issued_approved_name: "".to_string(),
            issued_approved_date: "".to_string(),
            items_received_name: "".to_string(),
            items_received_date: "".to_string(),
            items_issued_name: "".to_string(),
            items_issued_date: "".to_string(),
            action_ledger_name: "".to_string(),
            action_ledger_date: "".to_string(),
            hod_approval: "Pending".parse().unwrap(),
        }
    }
}
impl FromStr for HodApproval {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Pending" => Ok(Self::Pending),
            "Accepted" => Ok(Self::Accepted),
            "Rejected" => Ok(Self::Rejected),
            _ => Err(())
        }
    }
}
impl FromStr for Desig {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "HOD" => Ok(Self::HOD),
            "Faculty" => Ok(Self::Faculty),
            "Staff" => Ok(Self::Staff),
            "Office" => Ok(Self::Office),
            "Student" => Ok(Self::Student),
            _ => Err(())
        }
    }
}