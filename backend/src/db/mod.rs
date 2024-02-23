use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use crate::ai::Ingredient;

pub mod recipe;

#[derive(Debug, FromRow, Serialize, Deserialize, Default)]
pub struct DBRecipe {
    pub name: String,
    pub instructions: String,
    pub ingredients: sqlx::types::Json<Vec<Ingredient>>
}