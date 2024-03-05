use actix_web::web::{Data, Json};
use serde::{Deserialize, Serialize};
use sqlx::{query, Pool, Postgres, Row};

use super::DBError;
use crate::handlers::user::CreateUserBody;

#[derive(Debug, Serialize, Deserialize)]
pub struct UserDB {
    pub name: String,
    pub email: String,
    pub password: String,
}

pub async fn insert_user(db_pool: Data<Pool<Postgres>>, user: Json<CreateUserBody>) -> Result<UserDB, DBError> {
    let res = query("INSERT INTO \"user\" (name, email, password) VALUES ($1, $2, $3) RETURNING *")
        .bind(&user.name)
        .bind(&user.email)
        .bind(&user.password)
        .fetch_one(&**db_pool)
        .await
        .unwrap();
    Ok(UserDB {
        name: res.get("name"),
        email: res.get("email"),
        password: res.get("password"),
    })
}