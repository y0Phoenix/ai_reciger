/* eslint-disable @typescript-eslint/no-explicit-any */
import { CLOSE_AI_MODAL, CLOSE_CONFIRM_MODAL, CLOSE_LOGIN_MODAL, CLOSE_REGISTER_MODAL, SHOW_AI_MODAL, SHOW_CONFIRM_MODAL, SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL } from "../actions/types"

type ModalState = {
    loginShow: boolean,
    registerShow: boolean,
    aiShow: boolean,
    confirm: {
        show: boolean,
        id: string,
        callback: any
    }
}

type GenericModalAction = {
    type: typeof SHOW_LOGIN_MODAL | typeof CLOSE_LOGIN_MODAL | typeof SHOW_REGISTER_MODAL | typeof CLOSE_REGISTER_MODAL | typeof SHOW_AI_MODAL | typeof CLOSE_AI_MODAL | typeof CLOSE_CONFIRM_MODAL
}

type ShowConfirmModalAction = {
    type: typeof SHOW_CONFIRM_MODAL,
    payload: {
        id: string,
        callback: any
    }
}

type ModalAction = GenericModalAction | ShowConfirmModalAction;

export type { ModalState, ModalAction }