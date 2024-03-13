use actix_web::web::Data;
use sqlx::{query, Pool, Postgres, Row};

use super::{DBResponse, DBRecipe, Recipe};

pub async fn get_all_recipes(db_pool: Data<Pool<Postgres>>) -> Result<Vec<DBRecipe>, DBResponse> {
    let Ok(res) = query("SELECT * from recipe").fetch_all(&**db_pool).await else { return Err(DBResponse::err("Error fetching recipes from database")); };
    Ok(res.iter().map(|row| {
        DBRecipe {
            recipe: Recipe {
                id: row.get("id"),
                name: row.get("name"),
                servings: row.get("servings"),
            },
            instructions: row.get("instructions"),
            ingredients: row.get("ingredients"),
        }
    }).collect())
}

pub async fn insert_recipe(db_pool: Data<Pool<Postgres>>, recipe: &DBRecipe) -> Result<(), DBResponse> {
    let Ok(_res) = query("INSERT INTO recipe (name, servings, instructions, ingredients) VALUES ($1, $2, $3, $4)")
        .bind(&recipe.recipe.name)
        .bind(&recipe.recipe.servings)
        .bind(&recipe.instructions)
        .bind(&recipe.ingredients)
        .execute(&**db_pool)
        .await else {
            return Err(DBResponse::err("Failed to insert new recipe into database"));
        };
    Ok(())
}

pub async fn get_recipe(db_pool: Data<Pool<Postgres>>, recipe: &str) -> Result<DBRecipe, DBResponse> {
    let Ok(res) = query("SELECT * FROM recipe WHERE (name = $1)")
        .bind(recipe)
        .fetch_one(&**db_pool)
        .await else {
            return Err(DBResponse::err("Recipe not found"));
        };
        Ok(DBRecipe {
            recipe: Recipe {
                id: res.get("id"),
                name: res.get("name"),
                servings: res.get("servings"),
            },
            ingredients: res.get("ingredients"),
            instructions: res.get("instructions"),
        })
}

pub async fn update_recipe(db_pool: Data<Pool<Postgres>>, recipe: &DBRecipe) -> Result<DBRecipe, DBResponse> {
    let Ok(_res) = query("UPDATE recipe SET name = $1, servings = $2, ingredients = $3, instructions = $4 WHERE id = $5")
        .bind(&recipe.recipe.name)
        .bind(&recipe.recipe.servings)
        .bind(&recipe.ingredients)
        .bind(&recipe.instructions)
        .bind(&recipe.recipe.id)
        .execute(&**db_pool)
        .await else {
            return Err(DBResponse::err("Failed to update recipe"));
        };
    Ok(recipe.clone())
}