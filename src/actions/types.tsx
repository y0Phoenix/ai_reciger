// alert types
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

// loading types
export const LOADING = 'LOADING';
export const STOP_LOADING = 'STOP_LOADING';

// user types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_UPDATED = 'USER_UPDATED';
export const USER_UPDATED_FAIL = 'USER_UPDATED_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// ingredient types
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const FILTER_INGREDIENTS = 'FILTER_INGREDIENTS';
export const RESET_FILTER_INGREDIENTS = 'RESET_FILTER_INGREDIENTS';
export const GET_INGREDIENT = 'GET_INGREDIENT';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

// recipe types
export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_RECIPES = 'FILTER_RECIPES';
export const RESET_FILTER_RECIPES = 'RESET_FILTER_RECIPES';
export const GET_RECIPES_FAIL = 'GET_RECIPES_FAIL';
export const CLEAR_RECIPES = 'CLEAR_RECIPES';

/**
 * legacy/needs proper implementation 
 export const GET_CATEGORIES = 'GET_CATEGORIES';
 export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL';
 export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';
 */

// modal types
/**
 * @description set the ingredient modal only
 */
export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
/**
 * @description set the confirm modal only
 */
export const SET_CONFIRM_MODAL = 'SET_CONFIRM_MODAL';
/**
 * @description removes a singel modal type from state
 */
export const REMOVE_MODAL = 'REMOVE_MODAL';
/**
 * @description resets the entire modal state to initial
 */
export const RESET_MODAL = 'RESET_MODAL';

// toast types
export const SET_TOAST = 'SET_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';
export const SET_TOAST_WITH_ID = 'SET_TOAST_WITH_ID';

