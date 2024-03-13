use std::fmt::Display;

use actix_web::ResponseError;
use serde::{Deserialize, Serialize};

use crate::{ai::MessageStreamError, db::DBResponse};

#[derive(Debug, Default)]
pub struct Error(pub ResponseMessage);

impl ResponseError for Error {}

impl Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl From<DBResponse> for Error {
    fn from(value: DBResponse) -> Self {
        Self(value.0)
    }
}

impl From<MessageStreamError> for Error {
    fn from(value: MessageStreamError) -> Self {
        Self(ResponseMessage::Error(value.0))
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ResponseMessage {
    Error(String),
    Ok(String)
}

impl Display for ResponseMessage {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ResponseMessage::Error(msg) => write!(f, "Error {}", msg),
            ResponseMessage::Ok(msg) => write!(f, "Ok {}", msg),
        }
    }
}

impl Default for ResponseMessage {
    fn default() -> Self {
        Self::Ok("Ok request".to_string())
    }
}