import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clearStateAction } from "../common/actions/clearStateAction";

const educationAdapter = createEntityAdapter({
    selectId: (education) => education.id,
    sortComparer: (a, b) => a.id - (b.id),
});
const initialState = educationAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedEducationId: null
});
export const educationSlice = createSlice({
    name: 'education',
    initialState: initialState,
    reducers: {
        setAllEducations: educationAdapter.setAll,
        addEducation: educationAdapter.addOne,
        removeManyEducations: educationAdapter.removeMany,
        updateEducation: educationAdapter.updateOne,
        deleteEducation: educationAdapter.removeOne,
        selectEducation: (state, action) => {
            state.selectedEducationId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearStateAction, (state) => {
            educationAdapter.removeAll(state);
        });
    },
});
export const { 
    addEducation, 
    deleteEducation, 
    updateEducation, 
    selectEducation, 
    setAllEducations,
    removeManyEducations
} = educationSlice.actions;
export const {
    selectAll: selectAllEducations,
    selectById: selectEducationById,
    selectIds: selectEducationIds,
    selectTotal: selectEducationTotal,
    selectEntities:selectEducationEntities
} = educationAdapter.getSelectors((state) => state.educations);

export const educationsSelectors = educationAdapter.getSelectors((state) => state.educations);
