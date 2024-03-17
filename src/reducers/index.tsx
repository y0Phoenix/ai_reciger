import { combineReducers } from "redux";
import alert from "./alert";
import user from "./user";
import recipe from "./recipe";
import loading from "./loading";
import toast from "./toast";

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
    alert,
    user,
    recipe,
    loading,
    toast
});