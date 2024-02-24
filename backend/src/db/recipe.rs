use actix_web::web::Data;
use sqlx::{query, Pool, Postgres, Row};

use super::{DBError, DBRecipe, Recipe};

pub async fn get_all_recipes(db_pool: Data<Pool<Postgres>>) -> Result<Vec<DBRecipe>, DBError> {
    let Ok(res) = query("SELECT * from recipe").fetch_all(&**db_pool).await else { return Err(DBError::new("Error fetching recipes from database")); };
    Ok(res.iter().map(|row| {
        DBRecipe {
            recipe: Recipe {
                name: row.get("name"),
                servings: row.get("servings"),
            },
            instructions: row.get("instructions"),
            ingredients: row.get("ingredients"),
        }
    }).collect())
}

pub async fn insert_recipe(db_pool: Data<Pool<Postgres>>, recipe: &DBRecipe) -> Result<(), DBError> {
    let Ok(_res) = query("INSERT INTO recipe (name, servings, instructions, ingredients) VALUES ($1, $2, $3, $4)")
        .bind(&recipe.recipe.name)
        .bind(&recipe.recipe.servings)
        .bind(&recipe.instructions)
        .bind(&recipe.ingredients)
        .execute(&**db_pool)
        .await else {
            return Err(DBError::new("Failed to insert new recipe into database"));
        };
    Ok(())
}