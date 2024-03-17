use std::fmt::Display;
use actix_web::ResponseError;
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgRow, prelude::FromRow, Row};

use crate::types::ResponseMessage;

pub mod recipe;
pub mod user;

pub const DB_DATE_FORMAT: &str = "%Y-%m-%d";

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct DBResponse(pub ResponseMessage);

impl DBResponse {
    fn err(message: &str) -> Self {
        Self(ResponseMessage::Error(message.to_string()))
    }
}

impl Display for DBResponse {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match &self.0 {
            ResponseMessage::Error(msg) => write!(f, "Error {}", msg),
            ResponseMessage::Ok(msg) => write!(f, "Ok {}", msg),
        }
    }
}

impl ResponseError for DBResponse {}
#[derive(Debug, FromRow, Serialize, Deserialize, Default, Clone)]
pub struct DBRecipe {
    pub recipe: Recipe,
    pub ingredients: sqlx::types::Json<Ingredients>,
    pub instructions: String,
    pub modified: String,
}


impl From<PgRow> for DBRecipe {
    fn from(value: PgRow) -> Self {
        Self {
            recipe: Recipe {
                id: value.get("id"),
                name: value.get("name"),
                servings: value.get("servings"),
            },
            instructions: value.get("instructions"),
            ingredients: value.get("ingredients"),
            modified: value.get("modified"),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct Ingredients(Vec<Ingredient>);

#[derive(Debug, Serialize, Deserialize)]
pub struct Instructions(Vec<String>);

#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct Ingredient {
    pub name: String,
    pub quantity: String,
    pub unit: String,
    pub notes: String
}

#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct Recipe {
    pub id: i64,
    pub name: String,
    pub servings: String
}