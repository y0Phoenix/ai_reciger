import { RecipeState } from "./Recipe";
import { UserState } from "./User";

type State = {
    user: UserState,
    recipe: RecipeState
};

export default State;