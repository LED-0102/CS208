use actix_web::web;
use serde::{Serialize, Serializer};
use crate::db::structs::{SS04, MM04};
use crate::ws::server::{ChatServer, Identifier};
use serde_json;

pub enum Forms {
    SS04(SS04),
    MM04(MM04)
}
pub trait FormTrait: Serialize {
    fn process (&self);
    fn get_identifier (&self) -> &Identifier;
    async fn send_form (&self, srv: web::Data<ChatServer>) {
        let form_string = serde_json::to_string(&self).unwrap();
        srv.send_message(&form_string, self.get_identifier()).await;
    }
}

impl Serialize for Forms {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: Serializer {
        match self {
            Forms::SS04(ss04) => {
                ss04.serialize(serializer)
            }
            Forms::MM04(mm04) => {
                mm04.serialize(serializer)
            }
        }
    }
}

impl FormTrait for Forms {

    fn process(&self) {
        match self {
            Forms::SS04(_) => {}
            Forms::MM04(_) => {}
        }
    }

    fn get_identifier(&self) -> &Identifier {
        match self {
            Forms::SS04(ss04) => {
                &ss04.receiver
            }
            Forms::MM04(mm04) => {
                &mm04.receiver
            }
        }
    }
}