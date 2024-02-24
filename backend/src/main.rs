use dotenv::dotenv;
use handlers::recipe::{get_ai_recipe, get_all_recipes};
use sqlx::PgPool;
use std::env;
use actix_web::{web::Data, App, HttpServer};

mod handlers;
mod db;
mod ai;
mod types;


#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let db_url = env::var("DB_URL").expect("DB_URL env not set");
    let pool = PgPool::connect(&db_url).await.unwrap();
    HttpServer::new(move || {
        App::new().app_data(Data::new(pool.clone()))
            .service(get_all_recipes)
            .service(get_ai_recipe)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}