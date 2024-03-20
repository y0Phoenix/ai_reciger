/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from 'redux-thunk';
import {
    CLEAR_CURR_RECIPE,
    CURR_RECIPE,
    GET_RECIPES, GET_RECIPES_FAIL
} from './types';
import State from '../types/State';
import { loading, stopLoading } from './loading';
import axios from 'axios';
import { Recipe, RecipeAction } from '../types/Recipe';
import { NavigateFunction } from 'react-router-dom';

export const getRecipes = () => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.get(`/recipe/all`);
        dispatch(stopLoading());

        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: GET_RECIPES,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        // if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const getRecipeById = (id: number, navigate: NavigateFunction) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        console.log("getting");
        const res = await axios.get(`/recipe/${id}`);
        dispatch(stopLoading());
        
        console.log("got");
        navigate(`/recipe/${id}`);

        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: CURR_RECIPE,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        // if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const setCurrRecipe = (recipe: Recipe) => (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    dispatch({
        type: CURR_RECIPE,
        payload: recipe
    });
}

export const clearCurrRecipe = () => (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    dispatch({
        type: CLEAR_CURR_RECIPE
    });
}

export const editRecipe = (recipe: Recipe) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/recipe/update`, recipe);
        dispatch(stopLoading());

        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: CURR_RECIPE,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        // if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const deleteRecipe = (id: number) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.delete(`/recipe/${id}`);
        dispatch(stopLoading());

        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: CURR_RECIPE,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        // if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};
export const getAIRecipe = (prompt: string, navigate: NavigateFunction) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/recipe/ai`, { prompt });
        dispatch(stopLoading());

        // if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: CURR_RECIPE,
            payload: res.data
        });
        navigate(`/recipe/${res.data.recipe.id}`);
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        // if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
}
