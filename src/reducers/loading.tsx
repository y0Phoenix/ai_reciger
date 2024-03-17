import { 
    LOADING,
    STOP_LOADING
} from "../actions/types";

interface Action {
    type: string
}

export default function loading(state = {bool: false}, action: Action) {
    const {type} = action;
    switch (type) {
        case LOADING:
            state = {bool: true}
            return state;
        case STOP_LOADING:
            state = {bool: false};
            return state;
        default:
            return state;
    }
}