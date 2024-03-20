import { 
    LOADING,
    STOP_LOADING
} from "../actions/types";

interface Action {
    type: string
}

export default function loading(state = false, action: Action) {
    const {type} = action;
    switch (type) {
        case LOADING:
            state = true
            return state;
        case STOP_LOADING:
            state = false;
            return state;
        default:
            return state;
    }
}