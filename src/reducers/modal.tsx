import {
    SHOW_LOGIN_MODAL,
    SHOW_REGISTER_MODAL,
    CLOSE_LOGIN_MODAL,
    CLOSE_REGISTER_MODAL,
    SHOW_AI_MODAL,
    CLOSE_AI_MODAL
} from '../actions/types';
import { ModalState } from '../types/Modal';

interface Action {
    type: string
}

const initialState: ModalState = {
    loginShow: false,
    registerShow: false,
    aiShow: false
}

export default function modal(state = initialState, action: Action) {
    const { type } = action;
    switch (type) {
        case SHOW_LOGIN_MODAL:
            state = { ...state, loginShow: true };
            return state;
        case CLOSE_LOGIN_MODAL:
            state = { ...state, loginShow: false };
            return state;
        case SHOW_REGISTER_MODAL:
            state = { ...state, registerShow: true };
            return state;
        case CLOSE_REGISTER_MODAL:
            state = { ...state, registerShow: false };
            return state;
        case SHOW_AI_MODAL:
            state = { ...state, aiShow: true };
            return state;
        case CLOSE_AI_MODAL:
            state = { ...state, aiShow: false };
            return state;
        default:
            return state;
    }
}