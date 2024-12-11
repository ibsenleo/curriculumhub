import { createSlice } from "@reduxjs/toolkit";
import { fetchAndSetOffices } from "./staticDataThunks";

const initialState = {
    skillLevels: [],
    offices: [],
    isLoading: false,
    error: null
}


export const staticDataSlice = createSlice({
    name: 'resumee',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        setSkillLevels(state, {payload}) {
            state.skillLevels = payload
        },
        setOffices(state,{payload}) {
            state.offices = payload
        }
    },
    // automatic created by thunk 
    extraReducers: (builder) => {
        builder
            .addCase(fetchAndSetOffices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAndSetOffices.fulfilled, (state, { payload }) => {
                state.offices = payload.offices || []
                state.skillLevels = payload.skillLevels || []
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchAndSetOffices.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.offices = null;
            })
    },
})

// export const { addResumee, deleteResumee, updateResumee, selectResumee } = resumeeSlice.actions;

// Specific export (inside globals)
// export const {
//     selectAll: selectAllResumees,
//     selectById: selectResumeeById,
//     selectIds: selectResumeeIds,
// } = resumeeAdapter.getSelectors((state) => state.resumees);

//Global export
// export const resumeesSelectors = resumeeAdapter.getSelectors((state) => state.resumees);
export const selectOfficesTotal = (state) => state.staticData.offices.length;
export const selectAllOffices = (state) => state.staticData.offices;

export const { setSkillLevels, setOffices } = staticDataSlice.actions;