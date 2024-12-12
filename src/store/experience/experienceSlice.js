import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clearStateAction } from "../common/actions/clearStateAction";

const experienceAdapter = createEntityAdapter({
    // Definir el "selectId" para especificar cuál es el ID del grupo
    selectId: (experience) => experience.id,
    // Opcionalmente, puedes definir un "sortComparer" para ordenar los grupos
    sortComparer: (a, b) => a.id - (b.id),
})

const initialState = experienceAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedExperienceId: null
})


export const experienceSlice = createSlice({
    name: 'experience',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        setAllExperiences: experienceAdapter.setAll,
        addExperience: experienceAdapter.addOne,
        removeManyExperiences: experienceAdapter.removeMany,
        updateExperience: experienceAdapter.updateOne,
        deleteExperience: experienceAdapter.removeOne,
        selectExperience: (state, action) => {
            state.selectedExperienceId = action.payload; // Actualiza el ID del grupo seleccionado
        },
    },
    // automatic created by thunk 
    extraReducers: (builder) => {
        builder
            .addCase(clearStateAction, (state) => {
                experienceAdapter.removeAll(state)
            });
    },
})

export const { 
    addExperience, 
    deleteExperience, 
    updateExperience, 
    selectExperience, 
    setAllExperiences,
    removeManyExperiences
} = experienceSlice.actions;

// Specific export (inside globals)
export const {
    selectAll: selectAllExperiences,
    selectById: selectExperienceById,
    selectIds: selectExperienceIds,
    selectTotal: selectExperienceTotal,
    selectEntities:selectExperienceEntities
} = experienceAdapter.getSelectors((state) => state.experiences);

//Global export
export const experiencesSelectors = experienceAdapter.getSelectors((state) => state.experiences);