import { SET_TOAST, REMOVE_TOAST, SET_TOAST_WITH_ID } from "../actions/types";
import { ToastAction, ToastState } from "../types/Toast";

const initialState: ToastState = [];

export default function toast(state = initialState, action: ToastAction) {
    const {type} = action;
    switch (type) {
        case SET_TOAST:
            state = [ action.payload, ...state];
            return state;
        case SET_TOAST_WITH_ID:
            state = state.map(toast => toast.id == action.payload.id ? action.payload : toast);
            return state;
        case REMOVE_TOAST:
            state = state.filter(toast => toast.id !== action.payload ? toast : null);
            return state;
        default:
            return state;
    }
}