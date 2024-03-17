import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_UPDATED,
    USER_UPDATED_FAIL,
    } from '../actions/types';
import { UserAction, UserState } from '../types/User';
    import setAuthToken from '../utils/setAuthToken';
    
    const initialState: UserState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null
    };
    
    export default function user(state = initialState, action: UserAction) {
        const { type, payload } = action;
    
        switch (type) {
            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            case USER_LOADED:
                localStorage.setItem('token', payload.token);
                setAuthToken(localStorage.token);
                state = { ...state, isAuthenticated: payload.isAuthenticated, user: payload.data, token: payload.token }; 
                return state;
            case USER_UPDATED:
                state = {...state, isAuthenticated: true};
                return state;
            case REGISTER_FAIL:
            case USER_UPDATED_FAIL:
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case LOGOUT:
                localStorage.removeItem('token');
                setAuthToken(null);
                state = { ...state, token: null, isAuthenticated: false, user: null };
                return state;
            default:
                return state;
        }
    }
    