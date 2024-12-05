import { authStatus } from "../utils/const";

const authKey = 'user-auth-data'

const defaultData = {
    id: null,
    username: null,
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    avatar: null,
    status: authStatus.NOT_LOGGED,
    error: null
}

export const loadAuthData = () => {
    
    const userAuthDataString = localStorage.getItem(authKey);
    if(userAuthDataString) {
        const userAuthData = JSON.parse( userAuthDataString )
        return {...userAuthData, status: authStatus.LOGGED}
    }
    return defaultData
}