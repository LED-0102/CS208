use serde_derive::{Deserialize, Serialize};
use sqlx::FromRow;
use crate::ws::server::Identifier;

#[derive(Serialize, Deserialize, FromRow)]
pub struct Users {
    pub(crate) password: String,
}

#[derive(Serialize)]
pub struct SS04 {
    pub receiver: Identifier,
}


#[derive(Serialize)]
pub struct MM04 {
    pub receiver: Identifier
}
