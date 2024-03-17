/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import axios from 'axios';
import { loading, stopLoading } from './loading';
import { LOGIN_SUCCESS } from './types';

type FormData = {
    email: string,
    password: string,
    remeber: boolean
}

export const login = (formData: FormData, navigate: NavigateFunction) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/auth?remember=${formData.remeber}`, formData);
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