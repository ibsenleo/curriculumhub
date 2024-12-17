import { createAsyncThunk } from "@reduxjs/toolkit";
import { restApiAuth } from "../../services/restapi";
import { setAuthor, setAuthors } from "../author/authorSlice";
import { addCertification, addManyCertifications, removeManyCertifications, setAllCertifications } from "../certification";
import { addExpertise, addManyExpertise, removeManyExpertise, setAllExpertise } from "../expertise";
import { normalizeResumeePayload, normalizeSingleResumee } from "../resumeeDataNormalizer";
import { addExperience, addManyExperiences, removeManyExperiences, setAllExperiences } from "../experience";
import { addManySkills, addSkill, removeManySkills, setAllSkills } from "../skill";
import { camelToSnakeDeepWithoutId, snakeToCamelDeep } from "../../helpers/globals";
import { addEducation, addManyEducations, setAllEducations } from "../education";

export const fetchResumeesThunk = createAsyncThunk(
    'resumee/fetchResumees',
    async (_, { getState, dispatch, rejectWithValue }) => {
        console.log("dispatching resumee/fetchResumees")
        //get Auth state
        const authState = getState().auth;
        const { token } = authState

        try {
            const resp = await restApiAuth(token).get(`/resumees?populate[0]=author&populate[6]=author.avatar&populate[1]=expertise&populate[2]=certifications&populate[3]=experiences&populate[4]=skills&populate[5]=expertise.expertise_items&populate[7]=educations`)
            const transformedCaseData = snakeToCamelDeep(resp.data.data);
            const normalizedData = normalizeResumeePayload(transformedCaseData);
            console.log(normalizedData)
            
            dispatch(setAuthors(normalizedData.authors))
            dispatch(setAllExpertise(normalizedData.expertise))
            dispatch(setAllCertifications(normalizedData.certifications))
            dispatch(setAllExperiences(normalizedData.experiences))
            dispatch(setAllSkills(normalizedData.skills))
            dispatch(setAllEducations(normalizedData.educations))

            return normalizedData.resumees

        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.message || error.message
            return rejectWithValue(errorMessage)
        }
    }
);

//Resumee api creation request thunk
export const createResumeeThunk = createAsyncThunk(
    'resumee/createResumee',
    async (payload, { getState, dispatch, rejectWithValue }) => {
        //get Auth state
        const authState = getState().auth;
        const { token } = authState

        try {
            const resp = await restApiAuth(token).post('/resumees', payload)
            //Normalize resumee response
            const normalizedResumee = normalizeSingleResumee(resp.data);
            const normalizedCaseData = snakeToCamelDeep(normalizedResumee);

            //dispatch actions to update store with normalized data
            dispatch(setAuthor(normalizedCaseData.author))
            dispatch(addManyExpertise(normalizedCaseData.expertise))
            dispatch(addManyCertifications(normalizedCaseData.certifications))
            dispatch(addManyExperiences(normalizedCaseData.experiences))
            dispatch(addManySkills(normalizedCaseData.skills))
            dispatch(addManyEducations(normalizedCaseData.educations))

            
            return normalizedCaseData.resumee
        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.message || error.message
            return rejectWithValue(errorMessage)
        }
    }
);

export const removeResumeThunk = createAsyncThunk(
    'resumee/removeResumee',
    async (id, { getState, dispatch, rejectWithValue }) => {
        //get Auth state
        const authState = getState().auth;
        const resumee = getState().resumees.entities[id];
        const { token } = authState
        try {
            const resp = await restApiAuth(token).delete(`/resumees/${id}`)
            if(resp.data.id){
                dispatch(removeManyExpertise(resumee.expertise))
                dispatch(removeManyCertifications(resumee.certifications))
                dispatch(removeManyExperiences(resumee.experiences))
                dispatch(removeManySkills(resumee.skills))
            }


            return id
        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.message || error.message
            return rejectWithValue(errorMessage)
        }
    }
);
