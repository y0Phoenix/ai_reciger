type RecipeState = {
    recipes: Recipe[]
};

type Recipe = {
    name: string,
    servings: string,
    instructions: string,
    ingredients: Ingredient[],
    modified: string,
    created: string
}

type Ingredient = {
    name: string,
    quantity: string,
    unit: string,
    notes: string
}

type RecipeAction = {
    type: string,
    payload: Recipe[]
}


export type { RecipeState, Recipe, Ingredient, RecipeAction }