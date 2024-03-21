import {
    SHOW_LOGIN_MODAL,
    SHOW_REGISTER_MODAL,
    CLOSE_LOGIN_MODAL,
    CLOSE_REGISTER_MODAL,
    SHOW_AI_MODAL,
    CLOSE_AI_MODAL,
    SHOW_CONFIRM_MODAL,
    CLOSE_CONFIRM_MODAL,
} from '../actions/types';
import { ModalAction, ModalState } from '../types/Modal';

const initialState: ModalState = {
    loginShow: false,
    registerShow: false,
    aiShow: false,
    confirm: {
        show: false,
        id: "",
        callback: null
    }
}

export default function modal(state = initialState, action: ModalAction) {
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
        case SHOW_CONFIRM_MODAL:
            state = { ...state, confirm: { show: true, id: action.payload.id, callback: action.payload.callback } };
            return state;
        case CLOSE_CONFIRM_MODAL:
            state = { ...state, confirm: { show: false, id: "", callback: null } };
            return state;
        default:
            return state;
    }
}