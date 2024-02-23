use dotenv::dotenv;
use openai_dive::v1::{api::Client, models::Gpt35Engine, resources::chat::ChatMessageContent};
use openai_dive::v1::resources::chat::{ChatCompletionParameters, ChatMessage, Role};
use recipe::Recipe;
use serde::{Deserialize, Serialize};
use sqlx::{query, PgPool, Pool, Postgres, Row};
use std::env;
use actix_web::{get, web::{Data, Json}, App, HttpServer, Responder};

mod recipe;

#[derive(Debug, Serialize, Deserialize)]
struct RecipeBody {
    pub prompt: String
}

#[get("/recipe")]
async fn get_recipe(body: Json<RecipeBody>, db_pool: Data<Pool<Postgres>>) -> impl Responder {
    let api_key = env::var("OPENAI_API_KEY").expect("$OPENAI_API_KEY is not set");

    let res = query("SELECT * from recipe").fetch_one(&**db_pool).await.unwrap();
    let name: String = res.get("name");
    println!("{}", name);

    let client = Client::new(api_key);

    let parameters = ChatCompletionParameters {
        model: Gpt35Engine::Gpt35Turbo.to_string(),
        messages: vec![
            ChatMessage {
                role: Role::User,
                content: ChatMessageContent::Text(format!("Give me a recipe based off of this {}. Can you format your response in JSON? With recipe, ingredients, and instructions fields. And format the ingredients by name, quantity, unit, and any notes like minced, chopped, optional. And for the quantity field, make sure it's a string, not a number. Also make sure the string fields name and servings are under their own recipe struct. Also if an ingredient doesn't have any notes please still include the notes field but just leave the string empty. Also if there are no instructions still have an empty array.", body.prompt).to_string()),
                ..Default::default()
            },
        ],
        max_tokens: Some(500),
        ..Default::default()
    };

    let result = client.chat().create(parameters).await.unwrap();
    let recipe = Recipe::new(result).unwrap();
    Json(recipe)
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let db_url = env::var("DB_URL").expect("DB_URL env not set");
    let pool = PgPool::connect(&db_url).await.unwrap();
    HttpServer::new(move || {
        App::new().app_data(Data::new(pool.clone()))
            .service(get_recipe)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}