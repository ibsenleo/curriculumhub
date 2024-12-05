
import { restApi } from "../../services/restapi"
import { loggingIn, login, logout } from "./authSlice"


export const actionLogIn = (username, password) => {
    return async(dispatch) => {

        dispatch(loggingIn())

        try {
            const response = await restApi.post('/auth/local',{
                identifier: username,
                password,
                email: username
            })
            // console.log(response)    
            dispatch(login(response.data))
            
        } catch (error) {
            console.log(error)
            const message = error.response?.data?.message || error.message
            dispatch(logout({error: message}))
        }
    }
}
