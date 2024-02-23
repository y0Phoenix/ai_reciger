use actix_web::{get, web::{Data, Json}, Responder};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};

#[derive(Debug, Serialize, Deserialize)]
struct RecipeBody {
    pub prompt: String
}

#[get("/recipe/all")]
pub async fn get_all_recipes(db_pool: Data<Pool<Postgres>>) -> impl Responder {
    let recipes = crate::db::recipe::get_all_recipes(db_pool).await;

    // let recipe = Recipe::new(result).unwrap();
    Json(recipes)
}

#[get("/recipe/ai")]
pub async fn get_ai_recipe(body: Json<RecipeBody>) -> impl Responder {
    println!("poo");
    Json(crate::ai::get_ai_recipe(body.prompt.clone()).await.unwrap())
}