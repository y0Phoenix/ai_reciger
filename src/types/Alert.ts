type AlertAction = {
    type: string,
    payload?: Alert
};

type Alert = {
    msg: string,
    type: string,
    // id is an option type because in current functionality of alerts there can only be one alert at a time so the id param is irrelevent but can become relevent on later development  
    id?: string
};

export type { AlertAction, Alert }