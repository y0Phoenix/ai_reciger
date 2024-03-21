import { CLEAR_CURR_RECIPE, CLEAR_RECIPES, CURR_RECIPE, GET_RECIPES, GET_RECIPES_FAIL, REMOVE_RECIPE } from "../actions/types";

type RecipeState = {
    recipes: Recipe[],
    currRecipe: Recipe
};

export class Recipe {
    recipe: RecipeInfo = {
        name: "",
        servings: "",
        id: "new"
    }
    instructions: string = ""
    ingredients: Ingredient[] = [{
        name: "",
        quantity: "",
        unit: "",
        notes: ""
    }]
    modified: string = ""
    created: string = ""
}

type RecipeInfo = {
    name: string,
    servings: string,
    id: string
}

export class Ingredient {
    name: string = ""
    quantity: string = ""
    unit: string = ""
    notes: string = ""
}

type CurrRecipeAction = {
    type: typeof CURR_RECIPE,
    payload: Recipe
}

type RecipesAction = {
    type: typeof GET_RECIPES,
    payload: Recipe[]
}

type RecipesFailAction = {
    type: typeof GET_RECIPES_FAIL,
}

type ClearCurrRecipeAction = {
    type: typeof CLEAR_CURR_RECIPE,
}

type ClearRecipesAction = {
    type: typeof CLEAR_RECIPES,
}

type RemoveRecipeAction = {
    type: typeof REMOVE_RECIPE,
    payload: number
}

type RecipeAction = CurrRecipeAction | RecipesAction | ClearRecipesAction | RecipesFailAction | ClearCurrRecipeAction | RemoveRecipeAction;

export type { RecipeState, CurrRecipeAction, RecipeAction, RecipesAction, RecipeInfo, ClearRecipesAction, RecipesFailAction, ClearCurrRecipeAction, RemoveRecipeAction }