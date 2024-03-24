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
pub enum State {
    Pending,
    Accepted,
    Rejected
}
#[derive(Debug, PartialEq, Eq, Type, Deserialize, Serialize, Clone)]
pub enum Desig {
    HOD,
    Professor,
    Staff,
    Student,
    Office
}
#[derive(Debug, PartialEq, Eq, Type, Deserialize, Serialize, Clone)]
pub enum Degree {
    PhD, 
    MTech, 
    MS, 
    BTech,
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SS04 {
    pub note: String,
    pub submitter: i32,
    pub receiver: i32,
    pub date: String, // Assuming the date could be null
    pub custodian: String, //
    pub department: String,//
    pub location: String,//
    pub contact: String,//
    pub designation: String,//
    pub inventory_no: String,//
    pub room_no: String,//
    pub email: String,//
    pub items_receiving_date: String, //
    pub list_orders: Vec<SS04Orders>,
    pub total_amount: i32,
    pub name_indenter: String,
    pub sign_date_indenter: String, //
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
    pub approval_status: State,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct MM04 {
    pub note: String,
    pub receiver: i32,
    pub submitter: i32,
    pub quotation_no: String,
    pub date: String,
    pub requester_name: String,
    pub amount: i32,
    pub amount_tax: i32,
    pub amount_words: String,
    pub name_member: String,
    pub name_convener: String,
    pub designation_member: String,
    pub approval_status: State,
    pub reason: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SS01Orders {
    pub si: i32,
    pub item_name: String,
    pub item_specification: String,
    pub con_n_con: String, // Have to change it to ENUM
    pub required_number: i32,
    pub issued: String,
    pub cost: i32
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SS01 {
    pub note: String,
    pub receiver: i32,
    pub submitter: i32,
    pub date: String, 
    pub name_of_custodian: String,
    pub department: String,
    pub location: String,
    pub designation: String,
    pub inventory_no: String,
    pub room_no: String,
    pub item_purchase_info: String,
    pub name_head: String,
    pub list_orders: Vec<SS01Orders>,
    pub total_amount: i32,
    pub supplier_name_address: String,
    pub po_no_date: String,
    pub budget_head_account: String,
    pub challan_no_date: String,
    pub invoice_no_date: String,
    pub invoice_amount: i32,
    pub project_no: String,
    pub name_indenter: String,
    pub sign_date_indenter: String,
    pub sign_date_head: String,
    pub approval_status: State,
    pub reason: String
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct R1 {
    pub note: String,
    pub receiver: i32,
    pub submitter: i32,
    pub date: String, 
    pub purpose_of_expenditure: String,
    pub name_of_applicant: String,
    pub designation: String,
    pub department: String,
    pub payment_favour: String,
    pub budget_head_expenditure: String,
    pub project_sanction_no: String,
    pub expenditure_head: String,
    pub amount_claimed: i32,
    pub recommending_authority_name: String,
    pub approving_authority_name: String, 
    pub approval_status: State,
    pub reason: String
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Seeking {
    pub data: serde_json::Value
}

#[derive(Serialize, FromRow)]
pub struct Student {
    pub roll_no: String,
    pub student_name: String,
    pub email_id: String,
    pub degree: Degree
}

#[derive(Serialize, FromRow)]
pub struct Instrument {
    pub instrument_id: String,
    pub instrument_name: String,
    pub location: String
}

#[derive(Serialize, FromRow)]
pub struct Receivers {
    pub id: i32,
    pub username: String,
    pub designation: Desig
}

impl SS04 {
    pub fn default() -> Self {
        SS04{
            note: "".to_string(),
            submitter: 0,
            receiver: 0,
            date: "".to_string(),
            custodian: "".to_string(),
            department: "".to_string(),
            location: "".to_string(),
            contact: "".to_string(),
            designation: "".to_string(),
            inventory_no: "".to_string(),
            room_no: "".to_string(),
            email: "".to_string(),
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
            approval_status: "Pending".parse().unwrap(),
        }
    }
}

impl MM04 {
    pub fn default() -> Self {
        MM04{
            note: "".to_string(),
            receiver: 0,
            submitter: 0,
            quotation_no: "".to_string(),
            date: "".to_string(),
            requester_name: "".to_string(),
            amount: 0,
            amount_tax: 0,
            amount_words: "".to_string(),
            name_member: "".to_string(),
            name_convener: "".to_string(),
            designation_member: "".to_string(),
            approval_status: "Pending".parse().unwrap(),
            reason: "".to_string()
        }
    }
}

impl SS01 {
    pub fn default() -> Self {
        SS01 { 
            note: "".to_string(),
            receiver: 0, 
            submitter: 0, 
            date: "".to_string(), 
            name_of_custodian: "".to_string(), 
            department: "".to_string(), 
            location: "".to_string(), 
            designation: "".to_string(), 
            inventory_no: "".to_string(), 
            room_no: "".to_string(), 
            item_purchase_info: "".to_string(), 
            name_head: "".to_string(), 
            list_orders: vec![], 
            total_amount: 0, supplier_name_address: "".to_string(), 
            po_no_date: "".to_string(), 
            budget_head_account: "".to_string(), 
            challan_no_date: "".to_string(), 
            invoice_no_date: "".to_string(), 
            invoice_amount: 0, 
            project_no: "".to_string(), 
            name_indenter: "".to_string(), 
            sign_date_indenter: "".to_string(), 
            sign_date_head: "".to_string(), 
            approval_status: "Pending".parse().unwrap(),
            reason: "".to_string() 
        }
    }
}

impl R1 {
    pub fn default() -> Self {
        R1 { 
            note: "".to_string(), 
            receiver: 0, 
            submitter: 0, 
            date: "".to_string(), 
            purpose_of_expenditure: "".to_string(), 
            name_of_applicant: "".to_string(), 
            designation: "".to_string(), 
            department: "".to_string(), 
            payment_favour: "".to_string(), 
            budget_head_expenditure: "".to_string(), 
            project_sanction_no: "".to_string(), 
            expenditure_head: "".to_string(), 
            amount_claimed: 0, 
            recommending_authority_name: "".to_string(), 
            approving_authority_name: "".to_string(), 
            approval_status: "Pending".parse().unwrap(), 
            reason: "".to_string() 
        }      
    }
}

impl FromStr for State {
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
            "Professor" => Ok(Self::Professor),
            "Staff" => Ok(Self::Staff),
            "Office" => Ok(Self::Office),
            "Student" => Ok(Self::Student),
            _ => Err(())
        }
    }
}
impl FromStr for Degree {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "MS" => Ok(Self::MS),
            "PhD" => Ok(Self::PhD),
            "MTech" => Ok(Self::MTech),
            "BTech" => Ok(Self::BTech),
            _ => Err(())
        }
    }
}