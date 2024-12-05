import { createAsyncThunk } from "@reduxjs/toolkit";
import { restApiAuth } from "../../services/restapi";
import { normalizeResumeePayload } from "../resumeeDataNormalizer";
import { setAuthors } from "../author/authorSlice";

export const fetchResumeesThunk = createAsyncThunk(
    'groups/fetchResumees',
    async (_, { getState, dispatch, rejectWithValue }) => {
        //get Auth state
        const authState = getState().auth;
        const { token } = authState

        try {
            const resp = await restApiAuth(token).get(`/resumees?populate[0]=author&populate[6]=author.avatar`)
            const normalizedData = normalizeResumeePayload(resp.data.data);
            
            dispatch(setAuthors(normalizedData.authors))

            return normalizedData.resumees

        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.message || error.message
            return rejectWithValue(errorMessage)
        }
    }
);