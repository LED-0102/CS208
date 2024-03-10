use std::fmt;
use chrono::NaiveDate;
use serde::{Serialize, Deserialize, Serializer, Deserializer};
use sqlx::{Error, FromRow};
use sqlx::postgres::PgRow;


#[derive(Debug)]
pub struct PgDate(NaiveDate);

impl PgDate {
    fn new(year: i32, month: u32, day: u32) -> Option<Self> {
        NaiveDate::from_ymd_opt(year, month, day).map(|date| PgDate(date))
    }
}

impl Serialize for PgDate {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        let date_str = self.0.format("%Y-%m-%d").to_string();
        serializer.serialize_str(&date_str)
    }
}

impl<'de> Deserialize<'de> for PgDate {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
        where
            D: Deserializer<'de>,
    {
        let date_str = String::deserialize(deserializer)?;
        match NaiveDate::parse_from_str(&date_str, "%Y-%m-%d") {
            Ok(date) => Ok(PgDate(date)),
            Err(_) => Err(serde::de::Error::custom("Invalid date format")),
        }
    }
}
impl FromRow<'_, sqlx::postgres::PgRow> for PgDate {
    fn from_row(row: &'_ PgRow) -> Result<Self, Error> {
        todo!()
    }
}

impl fmt::Display for PgDate {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0.format("%Y-%m-%d"))
    }
}
