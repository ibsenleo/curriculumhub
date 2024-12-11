import { restApiAuth } from '../../services/restapi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAndSetOffices = createAsyncThunk(
    "staticData/fetchAndSetStaticData",
    async(_, { getState, dispatch, rejectWithValue }) => {
        //get Auth state
        const authState = getState().auth;
        const { token } = authState

        try {
            const resp = await restApiAuth(token).get(`/static-data`)
            return resp.data || {}

        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.message || error.message
            return rejectWithValue(errorMessage)
        }
    }
)
