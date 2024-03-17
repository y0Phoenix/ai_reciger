/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { LOADING, STOP_LOADING } from "./types"

export const loading = () => (dispatch: ThunkDispatch<State, undefined, any>) =>{
    dispatch({
        type: LOADING
    });
}

export const stopLoading = () => (dispatch: ThunkDispatch<State, undefined, any>) =>{
    dispatch({
        type: STOP_LOADING
    });
}