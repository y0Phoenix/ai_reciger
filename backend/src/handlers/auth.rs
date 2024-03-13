use chrono::{Months, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

use crate::types::Error;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    pub exp: usize,
    pub email: String
}

pub fn auth(token: &String) -> Result<String, Error> {
    match decrypt(token) {
        Ok(email) => Ok(email),
        Err(_err) => Err(Error(crate::types::ResponseMessage::Error("Failed to authorize token".to_string()))),
    }
}

pub fn token(email: &String) -> Result<String, Error> {
    match encode(&Header::default(), &Claims { 
            exp: Utc::now().checked_add_months(Months::new(1)).unwrap().timestamp() as usize,
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