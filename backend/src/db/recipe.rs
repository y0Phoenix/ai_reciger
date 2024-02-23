use actix_web::web::Data;
use sqlx::{query, Pool, Postgres, Row};

use super::DBRecipe;

pub async fn get_all_recipes(db_pool: Data<Pool<Postgres>>) -> Vec<DBRecipe> {
    let res = query("SELECT * from recipe").fetch_all(&**db_pool).await.unwrap();
    res.iter().map(|row| {
        DBRecipe {
            name: row.get("name"),
            instructions: row.get("instructions"),
            ingredients: row.get("ingredients")
        }
    }).collect()
}