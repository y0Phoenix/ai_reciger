use actix_web::web::{Data, Json};
use bcrypt::{hash, verify, DEFAULT_COST};
use serde::{Deserialize, Serialize};
use sqlx::{query, Pool, Postgres, Row};

use super::DBResponse;
use crate::handlers::user::ReqUserBody;

#[derive(Debug, Serialize, Deserialize)]
pub struct UserDB {
    pub name: String,
    pub email: String,
    pub password: String,
}

fn encrypt(pass: String) -> Result<String, DBResponse> {
    match hash(pass, DEFAULT_COST) {
        Ok(pass) => Ok(pass),
        Err(_) => Err(DBResponse::err("Failed to encrypt password!")),
    }
}

pub fn decrypt(pass: String, hash: String) -> Result<bool, DBResponse> {
    match verify(pass, &hash) {
        Ok(is_pass) => Ok(is_pass),
        Err(_) => Err(DBResponse::err("Failed to decrypt password!")),
    }
}

pub async fn insert_user(db_pool: &Data<Pool<Postgres>>, user: &Json<ReqUserBody>) -> Result<UserDB, DBResponse> {
    let pass = match encrypt(user.password.clone()) {
        Ok(pass) => pass,
        Err(err) => return Err(err),
    };
    let res = match query("INSERT INTO \"user\" (name, email, password) VALUES ($1, $2, $3) RETURNING *") 
        .bind(&user.name)
        .bind(&user.email)
        .bind(&pass)
        .fetch_one(&***db_pool)
        .await {
            Ok(res) => res,
            Err(_) => return Err(DBResponse::err("Failed to insert user into database")),
    };
    Ok(UserDB {
        name: res.get("name"),
        email: res.get("email"),
        password: res.get("password"),
    })
}

pub async fn get_user(db_pool: &Data<Pool<Postgres>>, user: &Json<ReqUserBody>) -> Result<UserDB, DBResponse> {
    let res = match query("SELECT * FROM \"user\" WHERE email = $1")
    .bind(&user.email)
    .fetch_one(&***db_pool)
    .await {
        Ok(res) => res,
        Err(_) => return Err(DBResponse::err("Failed to fetch user from database")),
    };
    
    Ok(UserDB {
        name: res.get("name"),
        email: res.get("email"),
        password: res.get("password"),
    })
}