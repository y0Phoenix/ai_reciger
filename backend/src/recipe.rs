use openai_dive::v1::resources::chat::{ChatCompletionResponse, ChatMessageContent};
use serde::{Deserialize, Serialize};

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

    // pub fn get_name(&mut self) -> Result<String, MessageStreamError> {
    //     let mut name = String::new();
    //     let mut chars = self.message.chars();
    //     let mut name_stage = 0;
    //     loop {
    //         match chars.next() {
    //             Some(char) => {
    //                 if char == 'N' && name_stage == 0 {
    //                     name_stage += 1;
    //                 }
    //                 else if char == 'a' && name_stage == 1 {
    //                     name_stage += 1;
    //                 }
    //                 else if char == 'm' && name_stage == 2 {
    //                     name_stage += 1;
    //                 }
    //                 else if char == 'e' && name_stage == 3 {
    //                     name_stage += 1;
    //                 }
    //                 else if char == ':' && name_stage == 4 {
    //                     name_stage += 1;
    //                 }
    //                 else if char.is_whitespace() && name_stage == 5 {
    //                     name_stage += 1;
    //                 }
    //                 else if char == '\n' && name_stage == 6 {
    //                     break;
    //                 }
    //                 else if name_stage == 6 {
    //                     name += &char.to_string();
    //                 }
    //             },
    //             None => return Err(MessageStreamError("Unexpected end of message".to_string())),
    //         }
    //         self.index += 1;
    //     }
    //     Ok(name.trim().to_string())
    // }
    // pub fn get_ingredients(&mut self) -> Result<Vec<Ingredient>, MessageStreamError> {
    //     let mut ingredients = Vec::new();
    //     let mut curr_ingrediet = String::new();
    //     let mut curr_ingredient_quantity = String::new();
    //     let mut curr_ingredient_unit = String::new();



    //     Ok(ingredients)
    // }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Recipe {
    pub name: String,
    pub servings: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ingredients(Vec<Ingredient>);

#[derive(Debug, Serialize, Deserialize)]
pub struct Instructions(Vec<String>);

impl Recipe {
    pub fn new(response: ChatCompletionResponse) -> Result<RecipeResonse, MessageStreamError> {

        let message = match MessageStream::new(&response) {
            Ok(message) => message.message,
            Err(_err) => return Err(_err),
        }; 

        println!("{message}");

        let json = serde_json::from_str::<RecipeResonse>(&message).unwrap();
        Ok(json)
    }
}

