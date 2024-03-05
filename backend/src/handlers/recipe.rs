use actix_web::{get, post, web::{Data, Json}, Responder, ResponseError};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

use crate::{db::{recipe::insert_recipe, DBRecipe}, types::Error};

#[derive(Debug, Serialize, Deserialize)]
struct RecipeBody {
    pub prompt: String
}

#[get("/recipe/all")]
pub async fn get_all_recipes(db_pool: Data<Pool<Postgres>>) -> Result<impl Responder, impl ResponseError> {
    let recipes = match crate::db::recipe::get_all_recipes(db_pool).await {
        Ok(recipes) => Json(recipes),
        Err(err) => return Err(err)
    };
    Ok(Json(recipes))
}

#[get("/recipe/ai")]
pub async fn get_ai_recipe(db_pool: Data<Pool<Postgres>>, body: Json<RecipeBody>) -> Result<impl Responder, impl ResponseError> {
    match crate::ai::get_ai_recipe(body.prompt.clone()).await {
        Ok(recipe) => {
            let recipe = recipe.into();
            match insert_recipe(db_pool, &recipe).await {
                Ok(_) => Ok(Json(recipe)),
                Err(err) => return Err(Error::from(err))
            }
        },
        Err(err) => Err(Error::from(err))
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct GetRecipe {
    name: String
}

#[get("/recipe")]
pub async fn get_recipe(db_pool: Data<Pool<Postgres>>, body: Json<GetRecipe>) -> Result<impl Responder, impl ResponseError> {
    match crate::db::recipe::get_recipe(db_pool, &body.name).await {
        Ok(recipe) => Ok(Json(recipe)),
        Err(err) => Err(Error::from(err))
    }
}

#[post("/recipe/update")]
pub async fn update_recipe(db_pool: Data<Pool<Postgres>>, body: Json<DBRecipe>) -> Result<impl Responder, impl ResponseError> {
    match crate::db::recipe::update_recipe(db_pool, &body).await {
        Ok(recipe) => Ok(Json(recipe)),
        Err(err) => Err(err)
    }
}