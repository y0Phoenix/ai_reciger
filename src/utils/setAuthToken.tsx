import axios from "axios";

const setAuthToken = (token: string | null) => {
    if (token) {
        return axios.defaults.headers.common['x-auth-token'] = token;
    }
    delete axios.defaults.headers.common['x-auth-token'];
}

export default setAuthToken;