use std::fmt::Display;

use actix_web::ResponseError;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use crate::types::ResponseMessage;

pub mod recipe;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct DBError(pub ResponseMessage);

impl DBError {
    fn new(message: &str) -> Self {
        Self(ResponseMessage::Error(message.to_string()))
    }
}

impl Display for DBError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match &self.0 {
            ResponseMessage::Error(msg) => write!(f, "Error {}", msg),
            ResponseMessage::Ok(msg) => write!(f, "Ok {}", msg),
        }
    }
}

impl ResponseError for DBError {}

#[derive(Debug, FromRow, Serialize, Deserialize, Default)]
pub struct DBRecipe {
    pub recipe: Recipe,
    pub ingredients: sqlx::types::Json<Vec<Ingredient>>,
    pub instructions: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredients(Vec<Ingredient>);

#[derive(Debug, Serialize, Deserialize)]
pub struct Instructions(Vec<String>);

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Ingredient {
    pub name: String,
    pub quantity: String,
    pub unit: String,
    pub notes: String
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Recipe {
    pub name: String,
    pub servings: String
}