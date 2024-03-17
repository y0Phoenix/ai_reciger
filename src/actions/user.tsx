import { NavigateFunction } from 'react-router-dom';


export const login = (formData: FormData, navigate: NavigateFunction) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/auth?remember=${formData.remeber}`, formData);
        dispatch(stopLoading());
        navigate('/dashboard');
        
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
       console.log(err);
       if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};