use actix_web::{get, post, web::{Data, Json}, HttpRequest, Responder, ResponseError};
use chrono::Local;
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

use crate::{db::{DBRecipe, DB_DATE_FORMAT}, handlers::auth::auth, types::Error};

#[derive(Debug, Serialize, Deserialize)]
struct RecipeBody {
    pub prompt: String
}

#[get("/recipe/all")]
pub async fn get_all_recipes(db_pool: Data<Pool<Postgres>>, req: HttpRequest) -> Result<impl Responder, impl ResponseError> {
    let user = auth(&db_pool, req).await?;
    let recipes = match crate::db::recipe::get_all_recipes(&db_pool, user).await {
        Ok(recipes) => Json(recipes),
        Err(err) => return Err(Error::from(err))
    };
    Ok(Json(recipes))
}

#[get("/recipe/ai")]
pub async fn get_ai_recipe(db_pool: Data<Pool<Postgres>>, body: Json<RecipeBody>, req: HttpRequest) -> Result<Json<DBRecipe>, impl ResponseError> {
    let _user = auth(&db_pool, req).await?;
    match crate::ai::get_ai_recipe(body.prompt.clone()).await {
        Ok(recipe) => Ok(Json(recipe.into())),
        Err(err) => Err(Error::from(err))
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct GetRecipe {
    name: String
}

#[get("/recipe")]
pub async fn get_recipe(db_pool: Data<Pool<Postgres>>, body: Json<GetRecipe>, req: HttpRequest) -> Result<impl Responder, impl ResponseError> {
    let user = auth(&db_pool, req).await?;
    match crate::db::recipe::get_recipe(&db_pool, &body.name, user).await {
        Ok(recipe) => Ok(Json(recipe)),
        Err(err) => Err(Error::from(err))
    }
}

#[post("/recipe/update")]
pub async fn update_recipe(db_pool: Data<Pool<Postgres>>, mut body: Json<DBRecipe>, req: HttpRequest) -> Result<impl Responder, impl ResponseError> {
    let _user = auth(&db_pool, req).await?;
    body.modified = Local::now().format(DB_DATE_FORMAT).to_string();
    match crate::db::recipe::update_recipe(&db_pool, &body).await {
        Ok(recipe) => Ok(Json(recipe)),
        Err(err) => Err(Error::from(err))
    }
}

#[post("/recipe")]
pub async fn insert_recipe(db_pool: Data<Pool<Postgres>>, body: Json<DBRecipe>, req: HttpRequest) -> Result<impl Responder, impl ResponseError> {
    let user = auth(&db_pool, req).await?;
    match crate::db::recipe::insert_recipe(&db_pool, &body, user).await {
        Ok(_) => Ok(format!("Recipe {} created successfully", body.recipe.name)),
        Err(err) => Err(Error::from(err))
    }
}