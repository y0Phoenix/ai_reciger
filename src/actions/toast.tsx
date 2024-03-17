import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { Toast, ToastAction } from "../types/Toast";
import { SET_TOAST, REMOVE_TOAST, SET_TOAST_WITH_ID } from "./types";

export const setToast = (toast: Toast) => (dispatch: ThunkDispatch<State, undefined, ToastAction>) => {
    dispatch({
        type: SET_TOAST,
        payload: toast
    });
};

export const setToastWithId = (toast: Toast) => (dispatch: ThunkDispatch<State, undefined, ToastAction>) => {
    dispatch({
        type: SET_TOAST_WITH_ID,
        payload: toast
    });
};

export const removeToast = (id: string) => (dispatch: ThunkDispatch<State, undefined, ToastAction>) => {
    dispatch({
        type: REMOVE_TOAST,
        payload: id
    });
};