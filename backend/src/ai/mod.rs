use std::fmt::Display;

use actix_web::ResponseError;
use chrono::Local;
use openai_dive::v1::{api::Client, error::APIError, models::Gpt35Engine, resources::chat::{ChatCompletionParameters, ChatCompletionResponse, ChatMessage, ChatMessageContent, Role}};
use serde::{Deserialize, Serialize};

use crate::db::{DBRecipe, Ingredients, Recipe};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct AIRecipe {
    pub recipe: AiRecipeInfo,
    pub instructions: String,
    pub ingredients: Ingredients
}

impl Into<DBRecipe> for AIRecipe {
    fn into(self) -> DBRecipe {
        DBRecipe { 
            recipe: Recipe {
                id: "".to_string(),
                name: self.recipe.name,
                servings: self.recipe.servings,
            }, 
            ingredients: sqlx::types::Json(self.ingredients),
            instructions: self.instructions,
            modified: Local::now().format("%Y-%m-%d").to_string()
        }
    }
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct AiRecipeInfo {
    pub name: String,
    pub servings: String
}

#[derive(Debug)]
pub struct MessageStreamError(pub String);

impl ResponseError for MessageStreamError {}

impl Display for MessageStreamError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

#[derive(Debug)]
pub struct MessageStream {
    pub message: String,
    // index: usize
}

impl MessageStream {
    pub fn new(message: &ChatCompletionResponse) -> Result<Self, MessageStreamError> {
        let content = message.choices.get(0).unwrap().message.content.clone();
        match content {
            ChatMessageContent::Text(message) => Ok(Self {
                message,
                // index: 0
            }),
            _ => Err(MessageStreamError("Response from GPT isn't text".to_string()))
        }
    }
}

pub async fn get_ai_recipe(prompt: String) -> Result<AIRecipe, MessageStreamError> {
    let api_key = std::env::var("OPENAI_API_KEY").expect("$OPENAI_API_KEY is not set");
    let client = Client::new(api_key);

    let params = ChatCompletionParameters {
        model: Gpt35Engine::Gpt35Turbo.to_string(),
        messages: vec![
            ChatMessage {
                role: Role::User,
                content: ChatMessageContent::Text(format!("Give me a recipe based off of this {}. Can you format your response in JSON? With recipe, ingredients, and instructions fields. And format the ingredients by name, quantity, unit, and any notes like minced, chopped, optional. And for the quantity field, make sure it's a string, not a number. Also make sure the string fields name and servings are under their own recipe struct. Also if an ingredient doesn't have any notes please still include the notes field but just leave the string empty. Format the instructions field with \\n characters, and if there are no instructions just have an emtpy string. Please make sure the JSON is valid too, no trailing commas", prompt).to_string()),
                ..Default::default()
            },
        ],
        max_tokens: Some(500),
        ..Default::default()
    };

    let mut i = 0;
    let recipe = loop {
        let message = match fetch_recipe(&client, params.clone()).await {
            Ok(message) => message,
            Err(err) => return Err(MessageStreamError(err.to_string())),
        };

        let Ok(json) = serde_json::from_str::<AIRecipe>(&message) else {
            i += 1;
            if i > 3 {
                return Err(MessageStreamError("API Error AI responses are invalid try again later".to_string()));
            }
            continue;
        };
        break json;
    };
    Ok(recipe)
}

async fn fetch_recipe(client: &Client, params: ChatCompletionParameters) -> Result<String, APIError> {
    let result = client.chat().create(params).await?;

    match MessageStream::new(&result) {
        Ok(message) => Ok(message.message),
        Err(_err) => return Err(APIError::StreamError("Failed to create message stream from API response".to_string())),
    }
}