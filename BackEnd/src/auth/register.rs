use bcrypt::{DEFAULT_COST, hash, verify};
use serde::Deserialize;
use actix_web::{web, HttpResponse, Responder};
use std::error::Error;
use sqlx::{PgPool, Row};
use crate::AppState;
use crate::db::structs::{Department, Desig};
use std::str::FromStr;
#[derive(Clone, Deserialize)]
pub struct NewUser {
    pub username: String,
    pub password: String,
    pub email: String,
    pub designation: String,
    pub department: String,
}
#[derive(Clone, Deserialize)]
pub struct NewUserDesig {
    pub username: String,
    pub password: String,
    pub email: String,
    pub designation: Desig,
    pub department: Department
}
pub struct User {
    pub username: String,
    pub password: String,
    pub email: String,
    pub designation: Desig,
    pub department: Department
}

impl NewUserDesig {
    pub fn new (username: String, password: String, email: String, designation: String, department_enum: String) -> Self {
        let hashed_password: String = hash (password.as_str(), DEFAULT_COST).unwrap();
        return Self {
            username,
            password: hashed_password,
            email,
            designation: Desig::from_str(&designation).unwrap(),
            department: Department::from_str(&department_enum).unwrap(),
        }
    }
}
impl User {
    pub fn verify(&self, password: String) -> bool {
        verify(password.as_str(), &self.password).unwrap()
    }
}
pub async fn insert(st: NewUserDesig, pool: &PgPool) -> Result<(), Box<dyn Error>> {
    let todo = sqlx::query("INSERT INTO users (username, password, email, admin, designation, department) VALUES ($1, $2, $3, 0, $4, $5) RETURNING id;")
        .bind(&st.username)
        .bind(&st.password)
        .bind(&st.email)
        .bind(&st.designation)
        .bind(&st.department)
        .fetch_one(pool)
        .await?;
    let _id: i32 = todo.try_get("id")?;
    Ok(())
}
pub async fn register (new_user: web::Json<NewUser>, state: web::Data<AppState>) -> impl Responder {
    let new_user = NewUserDesig::new(
        new_user.username.clone(),
        new_user.password.clone(),
        new_user.email.clone(),
        new_user.designation.clone(),
        new_user.department.clone()
    );
    println!("{} {}", new_user.password, new_user.username);
    match insert(new_user, &state.pool).await {
        Ok(_) => {
            println!("Created");
            HttpResponse::Created()
        },
        Err(e) => {
            println!("{}", &e.to_string());
            println!("Conflict");
            HttpResponse::Conflict()
        }
    }
}