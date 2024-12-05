import { createSlice } from '@reduxjs/toolkit';
import { authStatus } from '../../utils/const';
import { loadAuthData } from '../../helpers/auth';


// {
//     username: null,
//     token: null,
//     email: null,
//     firstName: null,
//     lastName: null,
//     avatar: null,
//     status: authStatus.NOT_LOGGED,
//     error: null
// }
const initialState = loadAuthData()

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggingIn: (state) => {
            state.status = authStatus.LOGGING
        },
        login: (state, {payload}) => {
            const {user, jwt} = payload;
            state.status = authStatus.LOGGED
            state.id = user.id
            state.username = user.username
            state.firstName = user.first_name
            state.lastName = user.last_name
            state.token = jwt
            state.email= user.email,
            state.avatar= user.avatar,
            state.error = null
        },
        logout: (state, {payload}) => {
            state.status = authStatus.NOT_LOGGED
            state.id = null
            state.username = null
            state.firstName = null
            state.lastName = null
            state.token = null
            state.email= null,
            state.avatar = null
            state.error = payload?.error || null
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, loggingIn } = authSlice.actions;