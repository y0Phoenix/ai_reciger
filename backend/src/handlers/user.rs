use actix_web::{get, post, web::{Data, Json}, Responder, ResponseError};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

use crate::db::user::insert_user;

#[derive(Debug, Serialize, Deserialize)]
pub struct ReqUserBody {
    pub name: Option<String>,
    pub email: String,
    pub password: String
}

#[post("/user")]
pub async fn create_user(db_pool: Data<Pool<Postgres>>, body: Json<ReqUserBody>) -> Result<impl Responder, impl ResponseError> {
    match insert_user(db_pool, body).await {
        Ok(user) => Ok(Json(user)),
        Err(err) => Err(err)
    }
}

#[get("/user")]
pub async fn get_user(db_pool: Data<Pool<Postgres>>, body: Json<ReqUserBody>) -> Result<impl Responder, impl ResponseError> {
    match crate::db::user::get_user(db_pool, body).await {
        Ok(user) => Ok(Json(user)),
        Err(err) => Err(err),

    }
}