/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import axios from 'axios';
import { loading, stopLoading } from './loading';
import { AUTH_ERROR, CLEAR_RECIPES, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from './types';

type LoginFormData = {
    email: string,
    password: string,
    remember: boolean
}

export const login = (formData: LoginFormData, navigate: NavigateFunction) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/user/auth`, formData);
        dispatch(stopLoading());
        navigate('/dashboard');
        
        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
       console.log(err);
    //    if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

type RegisterFormData = {
    name: string,
    email: string,
    password: string,
    remeber: boolean
}

export const register = (formData: RegisterFormData, navigate: NavigateFunction) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.post('/user', formData);
        dispatch(stopLoading());
        navigate('/dashboard');

        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        // if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        dispatch({
            type: REGISTER_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const loadUser = () => async (dispatch: any) => {
    try {
        const token = localStorage.token;
        let res;
        dispatch(loading());
        if (!token) {
            res = await axios.get('/user/auth');
        }
        else {
            res = await axios.get(`/user`);
        }
        dispatch(stopLoading());
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: AUTH_ERROR,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const logout = () => async (dispatch: any) => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_RECIPES
    });
};

export type { LoginFormData, RegisterFormData };