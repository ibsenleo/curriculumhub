import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clearStateAction } from "../common/actions/clearStateAction";

const certificationAdapter = createEntityAdapter({
    // Definir el "selectId" para especificar cuál es el ID del grupo
    selectId: (certification) => certification.id,
    // Opcionalmente, puedes definir un "sortComparer" para ordenar los grupos
    sortComparer: (a, b) => a.id - (b.id),
})

const initialState = certificationAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedCertificationId: null
})


export const certificationSlice = createSlice({
    name: 'certification',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        setAllCertifications: certificationAdapter.setAll,
        addCertification: certificationAdapter.addOne,
        removeManyCertifications: certificationAdapter.removeMany,
        updateCertification: certificationAdapter.updateOne,
        deleteCertification: certificationAdapter.removeOne,
        selectCertification: (state, action) => {
            state.selectedCertificationId = action.payload; // Actualiza el ID del grupo seleccionado
        },
    },
    // automatic created by thunk 
    extraReducers: (builder) => {
        builder
            .addCase(clearStateAction, (state) => {
                certificationAdapter.removeAll(state)
            });
    },
})

export const { 
    addCertification, 
    deleteCertification, 
    updateCertification, 
    selectCertification, 
    setAllCertifications,
    removeManyCertifications,
} = certificationSlice.actions;

// Specific export (inside globals)
export const {
    selectAll: selectAllCertifications,
    selectById: selectCertificationById,
    selectIds: selectCertificationIds,
    selectTotal: selectCertificationTotal,
    selectEntities:selectCertificationEntities
} = certificationAdapter.getSelectors((state) => state.certifications);

//Global export
export const certificationsSelectors = certificationAdapter.getSelectors((state) => state.certifications);