use actix_cors::Cors;
use dotenv::dotenv;
use handlers::{recipe::{delete_recipe, get_ai_recipe, get_all_recipes, get_recipe, insert_recipe, update_recipe}, user::{auth, create_user, get_user}};
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
        let cors = Cors::default()
            .allow_any_origin() // Allow requests from any origin (replace with your specific origin if needed)
            .allow_any_header() // Allow credentials (cookies, authorization headers, etc.)
            .allowed_methods(vec!["GET", "POST", "DELETE"]) // Allow only specified methods
            .max_age(3600)
        ;
        App::new().wrap(cors).app_data(Data::new(pool.clone()))
            .service(get_all_recipes)
            .service(get_ai_recipe)
            .service(get_recipe)
            .service(insert_recipe)
            .service(update_recipe)
            .service(delete_recipe)
            .service(create_user)
            .service(get_user)
            .service(auth)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}