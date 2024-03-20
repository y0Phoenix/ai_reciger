import { 
    CLEAR_CURR_RECIPE,
    CLEAR_RECIPES,
    CURR_RECIPE,
    // FILTER_RECIPES,
    GET_RECIPES,
    GET_RECIPES_FAIL,
    REMOVE_RECIPE,
    // RESET_FILTER_RECIPES
} from "../actions/types";
import { Recipe, RecipeAction, RecipeState } from "../types/Recipe";

const initialState: RecipeState = {
    recipes: [],
    currRecipe: new Recipe()
};

export default function recipe(state = initialState, action: RecipeAction) {
    const {type} = action;

    switch (type) {
        case GET_RECIPES:
            state = {...state, recipes: action.payload}
            return state;
        // case FILTER_RECIPES:
        //     state = {...state, filter: payload, filtered: true};
        //     return state;
        // case RESET_FILTER_RECIPES:
        //     state = {...state, filter: [], filtered: false};
        //     return state;
        case CURR_RECIPE:
            state = { ...state, currRecipe: action.payload }
            return state;
        case REMOVE_RECIPE:
            state.recipes = state.recipes.filter((recipe) => recipe.recipe.id !== action.payload);
            return state;
        case CLEAR_CURR_RECIPE:
            state = { ...state, currRecipe: new Recipe() }
            return state;
        case GET_RECIPES_FAIL:
        case CLEAR_RECIPES:
            state = {...state, recipes: [], currRecipe: new Recipe()}
            return state;
        default:
            return state;
    }
}