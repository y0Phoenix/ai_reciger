type UserState = {
    token: string | null,
    isAuthenticated: boolean | null,
    user: User | null
};

type User = {
    name: string,
    email: string,
    password: string,
}

type UserAction = {
    type: string,
    payload: UserActionPayload
};

type UserActionPayload = {
    is_authenticated: boolean,
    user: User,
    token: string
};

export type { UserState, User, UserAction, UserActionPayload };