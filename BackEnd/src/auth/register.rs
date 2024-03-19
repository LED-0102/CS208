use bcrypt::{DEFAULT_COST, hash, verify};
use serde::Deserialize;
use actix_web::{web, HttpResponse, Responder};
use std::error::Error;
use sqlx::{PgPool, Row};
use crate::AppState;
use crate::db::structs::Desig;
use std::str::FromStr;
#[derive(Clone, Deserialize)]
pub struct NewUser {
    pub username: String,
    pub password: String,
    pub email: String,
    pub designation: String
}
#[derive(Clone, Deserialize)]
pub struct NewUserDesig {
    pub username: String,
    pub password: String,
    pub email: String,
    pub designation: Desig
}
pub struct User {
    pub username: String,
    pub password: String,
    pub email: String,
    pub designation: Desig
}

impl NewUserDesig {
    pub fn new (username: String, password: String, email: String, designation: String) -> Self {
        let hashed_password: String = hash (password.as_str(), DEFAULT_COST).unwrap();
        return Self {
            username,
            password: hashed_password,
            email,
            designation: Desig::from_str(&designation).unwrap()
        }
    }
}
impl User {
    pub fn verify(&self, password: String) -> bool {
        verify(password.as_str(), &self.password).unwrap()
    }
}
pub async fn insert(st: NewUserDesig, pool: &PgPool) -> Result<(), Box<dyn Error>> {
    let todo = sqlx::query("INSERT INTO users (username, password, email, admin, designation) VALUES ($1, $2, $3, 0, $4) RETURNING id;")
        .bind(&st.username)
        .bind(&st.password)
        .bind(&st.email)
        .bind(&st.designation)
        .fetch_one(pool)
        .await?;
    let id: i32 = todo.try_get("id")?;
    let _ = sqlx::query("WITH form_keys AS (
            SELECT DISTINCT form FROM forms
        )
        UPDATE users
        SET
            seeking = jsonb_object_agg(form, '[]'::jsonb),
            pending = jsonb_object_agg(form, '[]'::jsonb),
            previous = jsonb_object_agg(form, '[]'::jsonb)
        FROM form_keys
        WHERE id=$1;
    ")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
pub async fn register (new_user: web::Json<NewUser>, state: web::Data<AppState>) -> impl Responder {
    let new_user = NewUserDesig::new(
        new_user.username.clone(),
        new_user.password.clone(),
        new_user.email.clone(),
        new_user.designation.clone()
    );
    println!("{} {}", new_user.password, new_user.username);
    match insert(new_user, &state.pool).await {
        Ok(_) => {
            println!("Created");
            HttpResponse::Created()
        },
        Err(_) => {
            println!("Conflict");
            HttpResponse::Conflict()
        }
    }
}