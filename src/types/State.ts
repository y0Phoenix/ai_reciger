import { ModalState } from "./Modal";
import { RecipeState } from "./Recipe";
import { UserState } from "./User";

type State = {
    user: UserState,
    recipe: RecipeState,
    modal: ModalState,
    loading: boolean
};

export default State;