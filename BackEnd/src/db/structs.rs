use serde_derive::{Deserialize, Serialize};
use sqlx::FromRow;
use pgdatetime::Timestamp;

#[derive(Serialize, Deserialize, FromRow)]
pub struct Users {
    pub(crate) password: String,
}


#[derive(Debug, Serialize, Deserialize)]
pub struct SS04Orders {
    pub supplier: String,
    pub bill: String,
    pub and_date: Option<Timestamp>, // Assuming the date could be null
    pub item: String,
    pub quantity: i32,
    pub con_n_con: ConNonCon,
    pub unit_price: i32,
    pub total: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ConNonCon {
    Con,
    NCon,
}

impl std::str::FromStr for ConNonCon {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Con" => Ok(ConNonCon::Con),
            "N-Con" => Ok(ConNonCon::NCon),
            _ => Err(()),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SS04Items {
    pub items_received_date: Option<Timestamp>, // Assuming the date could be null
    pub list_orders: Vec<SS04Orders>,
    pub total_amount: i32,
    pub name_indenter: String,
    pub sign_date_indenter: Option<Timestamp>, // Assuming the date could be null
    pub name_head: String,
    pub sign_date_head: Option<Timestamp>, // Assuming the date could be null
    pub issued_approved_name: String,
    pub issued_approved_date: Option<Timestamp>, // Assuming the date could be null
    pub items_received_name: String,
    pub items_issued_date: Option<Timestamp>, // Assuming the date could be null
    pub action_ledger_name: String,
    pub action_ledger_date: Option<Timestamp>, // Assuming the date could be null
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SS04 {
    pub id: i32,
    pub note: String,
    pub submitter: i32,
    pub receiver: i32,
    pub date: Option<Timestamp>, // Assuming the date could be null
    pub content: SS04Items,
    pub hod_approval: State,
}
impl SS04 {
    pub fn default() -> Self {
        SS04{
            id: 0,
            note: "".to_string(),
            submitter: 0,
            receiver: 0,
            date: None,
            content: SS04Items {
                items_received_date: None,
                list_orders: vec![],
                total_amount: 0,
                name_indenter: "".to_string(),
                sign_date_indenter: None,
                name_head: "".to_string(),
                sign_date_head: None,
                issued_approved_name: "".to_string(),
                issued_approved_date: None,
                items_received_name: "".to_string(),
                items_issued_date: None,
                action_ledger_name: "".to_string(),
                action_ledger_date: None,
            },
            hod_approval: State::Pending,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub enum State {
    Pending,
    Approved,
    Rejected,
}

impl std::str::FromStr for State {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Pending" => Ok(State::Pending),
            "Approved" => Ok(State::Approved),
            "Rejected" => Ok(State::Rejected),
            _ => Err(()),
        }
    }
}
