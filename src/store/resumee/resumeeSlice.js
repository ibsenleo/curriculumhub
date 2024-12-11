import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchResumeesThunk } from "./resumeeThunks";
import { clearStateAction } from "../common/actions/clearStateAction";

const resumeeAdapter = createEntityAdapter({
    // Definir el "selectId" para especificar cuál es el ID del grupo
    selectId: (resumee) => resumee.id,
    // Opcionalmente, puedes definir un "sortComparer" para ordenar los grupos
    sortComparer: (a, b) => a.id - (b.id),
})

const initialState = resumeeAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedResumeeId: null
})


export const resumeeSlice = createSlice({
    name: 'resumee',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        addResumee: resumeeAdapter.addOne,
        updateResumee: resumeeAdapter.updateOne,
        deleteResumee: resumeeAdapter.removeOne,
        selectResumee: (state, action) => {
            state.selectedResumeeId = action.payload; // Actualiza el ID del grupo seleccionado
        },
    },
    // automatic created by thunk 
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumeesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchResumeesThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                resumeeAdapter.setAll(state, payload);
                state.selectedResumeeId = (state.entities[state.selectedResumeeId]) 
                    ? state.selectedResumeeId
                    : null
            })
            .addCase(fetchResumeesThunk.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.selectedResumeeId = null;
            })
            .addCase(clearStateAction, (state) => {
                resumeeAdapter.removeAll(state)
            });
    },
})

export const { addResumee, deleteResumee, updateResumee, selectResumee } = resumeeSlice.actions;

// Specific export (inside globals)
export const {
    selectAll: selectAllResumees,
    selectById: selectResumeeById,
    selectIds: selectResumeeIds,
    selectTotal: selectResumeeTotal,
    selectEntities:selectResumeeEntities
} = resumeeAdapter.getSelectors((state) => state.resumees);

//Global export
export const resumeesSelectors = resumeeAdapter.getSelectors((state) => state.resumees);