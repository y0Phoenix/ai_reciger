/* eslint-disable @typescript-eslint/no-explicit-any */
import { CLOSE_AI_MODAL, CLOSE_LOGIN_MODAL, CLOSE_REGISTER_MODAL, SHOW_AI_MODAL, SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL } from "./types"

export const showLoginModal = () => (dispatch: any) => {
    dispatch({
        type: SHOW_LOGIN_MODAL
    })
}

export const closeLoginModal = () => (dispatch: any) => {
    dispatch({
        type: CLOSE_LOGIN_MODAL
    })
}

export const showRegisterModal = () => (dispatch: any) => {
    dispatch({
        type: SHOW_REGISTER_MODAL
    })
}

export const closeRegisterModal = () => (dispatch: any) => {
    dispatch({
        type: CLOSE_REGISTER_MODAL
    })
}

export const showAIModal = () => (dispatch: any) => {
    dispatch({
        type: SHOW_AI_MODAL
    })
}

export const closeAIModal = () => (dispatch: any) => {
    dispatch({
        type: CLOSE_AI_MODAL
    })
}