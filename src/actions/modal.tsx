/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from "redux-thunk"
import { ModalAction } from "../types/Modal"
import { CLOSE_AI_MODAL, CLOSE_CONFIRM_MODAL, CLOSE_LOGIN_MODAL, CLOSE_REGISTER_MODAL, SHOW_AI_MODAL, SHOW_CONFIRM_MODAL, SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL } from "./types"
import State from "../types/State"

export const showLoginModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SHOW_LOGIN_MODAL
    })
}

export const closeLoginModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: CLOSE_LOGIN_MODAL
    })
}

export const showRegisterModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SHOW_REGISTER_MODAL
    })
}

export const closeRegisterModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: CLOSE_REGISTER_MODAL
    })
}

export const showAIModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SHOW_AI_MODAL
    })
}

export const closeConfirmModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: CLOSE_CONFIRM_MODAL
    })
}

export const showConfirmModal = (id: string, callback: any) => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SHOW_CONFIRM_MODAL,
        payload: {
            id,
            callback
        }
    })
}

export const closeAIModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: CLOSE_AI_MODAL
    })
}