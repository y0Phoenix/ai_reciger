use actix_web::{web::{Data, Json}, HttpRequest};
use chrono::{Days, Months, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

use crate::{db::user::UserDB, types::Error};

use super::user::ReqUserBody;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    pub exp: usize,
    pub email: String
}

pub fn get_token(req: &HttpRequest) -> Result<String, Error> {
    match req.headers().get("x-auth-token") {
        Some(token) => match token.to_str() {
            Ok(token) => Ok(token.to_string()),
            Err(err) => Err(Error(crate::types::ResponseMessage::Error(err.to_string())))
        },
        None => Err(Error(crate::types::ResponseMessage::Error("No token in headers".to_string())))
    }
}

pub async fn auth(db_pool: &Data<Pool<Postgres>>, req: &HttpRequest) -> Result<UserDB, Error> {
    let token = get_token(req)?;
    match decrypt(&token) {
        Ok(email) => {
            match crate::db::user::get_user(db_pool, &Json(ReqUserBody {
                name: None, 
                email,
                password: "".to_string(),
                remember: None
            })).await {
                Ok(user) => Ok(user),
                Err(err) => Err(Error(err.0))
            }
        },
        Err(_err) => Err(Error(crate::types::ResponseMessage::Error("Failed to authorize token".to_string()))),
    }
}

pub fn token(email: &String, remember: bool) -> Result<String, Error> {
    let exp = if remember {
        Utc::now().checked_add_months(Months::new(12)).unwrap().timestamp()
    }
    else {
        Utc::now().checked_add_days(Days::new(7)).unwrap().timestamp()
    };
    match encode(&Header::default(), &Claims { 
            exp: exp as usize,
            email: email.to_string()
        }, &EncodingKey::from_secret(b"my_secret_token")) {
        Ok(token) => Ok(token),
        Err(_err) => Err(Error(crate::types::ResponseMessage::Error("Failed to encode new token".to_string()))),
    }
}

fn decrypt(token: &String) -> Result<String, Error> {
    match decode::<Claims>(token, &DecodingKey::from_secret(b"my_secret_token"), &Validation::default()) {
        Ok(data) => Ok(data.claims.email),
        Err(_err) => {
            println!("{_err}");
            Err(Error(crate::types::ResponseMessage::Error("Failed to decrypt token".to_string())))
        },
    }
}   