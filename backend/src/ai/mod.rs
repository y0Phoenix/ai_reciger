use openai_dive::v1::{api::Client, models::Gpt35Engine, resources::chat::{ChatCompletionParameters, ChatCompletionResponse, ChatMessage, ChatMessageContent, Role}};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredients(Vec<Ingredient>);

#[derive(Debug, Serialize, Deserialize)]
pub struct Instructions(Vec<String>);

#[derive(Debug)]
pub struct MessageStreamError(pub String);

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredient {
    pub name: String,
    pub quantity: String,
    pub unit: String,
    pub notes: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RecipeResonse {
    pub recipe: Recipe,
    pub ingredients: Ingredients,
    pub instructions: Instructions
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Recipe {
    pub name: String,
    pub servings: String
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

pub async fn get_ai_recipe(prompt: String) -> Result<RecipeResonse, MessageStreamError> {
    let api_key = std::env::var("OPENAI_API_KEY").expect("$OPENAI_API_KEY is not set");
    let client = Client::new(api_key);

    let parameters = ChatCompletionParameters {
        model: Gpt35Engine::Gpt35Turbo.to_string(),
        messages: vec![
            ChatMessage {
                role: Role::User,
                content: ChatMessageContent::Text(format!("Give me a recipe based off of this {}. Can you format your response in JSON? With recipe, ingredients, and instructions fields. And format the ingredients by name, quantity, unit, and any notes like minced, chopped, optional. And for the quantity field, make sure it's a string, not a number. Also make sure the string fields name and servings are under their own recipe struct. Also if an ingredient doesn't have any notes please still include the notes field but just leave the string empty. Also if there are no instructions still have an empty array.", prompt).to_string()),
                ..Default::default()
            },
        ],
        max_tokens: Some(500),
        ..Default::default()
    };

    let result = client.chat().create(parameters).await.unwrap();

    let message = match MessageStream::new(&result) {
        Ok(message) => message.message,
        Err(_err) => return Err(_err),
    }; 

    let json = serde_json::from_str::<RecipeResonse>(&message).unwrap();
    Ok(json)
}