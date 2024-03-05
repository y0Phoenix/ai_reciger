use actix_web::{post, web::{Data, Json}, Responder, ResponseError};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

use crate::db::user::insert_user;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUserBody {
    pub name: String,
    pub email: String,
    pub password: String
}

#[post("/user/insert")]
pub async fn create_user(db_pool: Data<Pool<Postgres>>, body: Json<CreateUserBody>) -> Result<impl Responder, impl ResponseError> {
    match insert_user(db_pool, body).await {
        Ok(user) => Ok(Json(user)),
        Err(err) => Err(err)
    }
}