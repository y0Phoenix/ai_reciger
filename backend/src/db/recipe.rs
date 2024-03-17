use actix_web::web::Data;
use sqlx::{query, Pool, Postgres};

use super::{user::UserDB, DBRecipe, DBResponse};

pub async fn get_all_recipes(db_pool: &Data<Pool<Postgres>>, user: UserDB) -> Result<Vec<DBRecipe>, DBResponse> {
    let Ok(res) = query("SELECT * from recipe WHERE user_email = $1")
        .bind(&user.email)
        .fetch_all(&***db_pool).await else { return Err(DBResponse::err("Error fetching recipes from database")); };
    Ok(res.into_iter().map(|row| DBRecipe::from(row)).collect())
}

pub async fn insert_recipe(db_pool: &Data<Pool<Postgres>>, recipe: &DBRecipe, user: UserDB) -> Result<(), DBResponse> {
    let _res = query("INSERT INTO recipe (name, servings, instructions, ingredients, user_email) VALUES ($1, $2, $3, $4, $5)")
        .bind(&recipe.recipe.name)
        .bind(&recipe.recipe.servings)
        .bind(&recipe.instructions)
        .bind(&recipe.ingredients)
        .bind(user.email)
        .execute(&***db_pool)
        .await.unwrap();
    Ok(())
}

pub async fn get_recipe(db_pool: &Data<Pool<Postgres>>, recipe: &str, user: UserDB) -> Result<DBRecipe, DBResponse> {
    match query("SELECT * FROM recipe WHERE name = $1 AND user_email = $2")
        .bind(recipe)
        .bind(user.email)
        .fetch_one(&***db_pool)
        .await {
            Ok(res) => Ok(DBRecipe::from(res)),
            Err(_err) => Err(DBResponse(crate::types::ResponseMessage::Error("Problem retrieving recipe from database".to_string()))),
        }
}

pub async fn update_recipe(db_pool: &Data<Pool<Postgres>>, recipe: &DBRecipe) -> Result<DBRecipe, DBResponse> {
    let Ok(_res) = query("UPDATE recipe SET name = $1, servings = $2, ingredients = $3, instructions = $4 WHERE id = $5")
        .bind(&recipe.recipe.name)
        .bind(&recipe.recipe.servings)
        .bind(&recipe.ingredients)
        .bind(&recipe.instructions)
        .bind(&recipe.recipe.id)
        .execute(&***db_pool)
        .await else {
            return Err(DBResponse::err("Failed to update recipe"));
        };
    Ok(recipe.clone())
}