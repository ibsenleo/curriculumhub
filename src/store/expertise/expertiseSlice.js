import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clearStateAction } from "../common/actions/clearStateAction";

const expertiseAdapter = createEntityAdapter({
    // Definir el "selectId" para especificar cuál es el ID del grupo
    selectId: (expertise) => expertise.id,
    // Opcionalmente, puedes definir un "sortComparer" para ordenar los grupos
    sortComparer: (a, b) => a.id - (b.id),
})

const initialState = expertiseAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedExpertiseId: null
})


export const expertiseSlice = createSlice({
    name: 'expertise',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        setAllExpertise: expertiseAdapter.setAll,
        addExpertise: expertiseAdapter.addOne,
        addManyExpertise: expertiseAdapter.addMany,
        removeManyExpertise: expertiseAdapter.removeMany,
        updateExpertise: expertiseAdapter.updateOne,
        deleteExpertise: expertiseAdapter.removeOne,
        selectExpertise: (state, action) => {
            state.selectedExpertiseId = action.payload; // Actualiza el ID del grupo seleccionado
        },
    },
    // automatic created by thunk 
    extraReducers: (builder) => {
        builder
            .addCase(clearStateAction, (state) => {
                expertiseAdapter.removeAll(state)
            });
    },
})

export const { 
    addExpertise, 
    addManyExpertise,
    deleteExpertise, 
    updateExpertise, 
    selectExpertise, 
    setAllExpertise, 
    removeManyExpertise 
} = expertiseSlice.actions;

// Specific export (inside globals)
export const {
    selectAll: selectAllExpertises,
    selectById: selectExpertiseById,
    selectIds: selectExpertiseIds,
    selectTotal: selectExpertiseTotal,
    selectEntities:selectExpertiseEntities
} = expertiseAdapter.getSelectors((state) => state.expertise);

//Global export
export const expertiseSelectors = expertiseAdapter.getSelectors((state) => state.expertise);