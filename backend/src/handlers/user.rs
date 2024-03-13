use actix_web::{get, post, web::{Data, Json}, HttpRequest, Responder, ResponseError};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

use crate::{db::user::{insert_user, UserDB}, types::Error};

use super::auth::token;

#[derive(Debug, Serialize, Deserialize)]
pub struct ReqUserBody {
    pub name: Option<String>,
    pub email: String,
    pub password: String
}

#[derive(Debug, Serialize, Deserialize)]
struct ResUserBody {
    pub user: UserDB,
    pub token: String
}

#[post("/user")]
pub async fn create_user(db_pool: Data<Pool<Postgres>>, body: Json<ReqUserBody>) -> Result<impl Responder, impl ResponseError> {
    match insert_user(&db_pool, body).await {
        Ok(user) => Ok(Json(user)),
        Err(err) => Err(err)
    }
}

#[get("/user")]
pub async fn get_user(db_pool: Data<Pool<Postgres>>, body: Json<ReqUserBody>) -> Result<impl Responder, impl ResponseError> {
    match crate::db::user::get_user(&db_pool, body).await {
        Ok(user) => {
            match token(&user.email) {
                Ok(token) => Ok(Json(ResUserBody {
                    user,
                    token
                })),
                Err(err) => Err(err)
            }
        },
        Err(err) => Err(Error(err.0)),
    }

}

#[derive(Debug, Serialize, Default, Deserialize)]
struct TokenHeader {
    pub token: String
}

#[get("/user/auth")]
pub async fn auth(db_pool: Data<Pool<Postgres>>, req: HttpRequest) -> Result<Json<UserDB>, Error> {
    let user = crate::handlers::auth::auth(&db_pool, req).await?;
    Ok(Json(user))
}