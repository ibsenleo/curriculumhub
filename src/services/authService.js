import { restApi } from "./restapi"


export const registerUser = async (username, email, password) => {
    const response = await restApi.post('/register',{
        username,
        password,
        email
    })

    return response
}