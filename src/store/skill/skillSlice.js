import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clearStateAction } from "../common/actions/clearStateAction";

const skillAdapter = createEntityAdapter({
    // Definir el "selectId" para especificar cuál es el ID del grupo
    selectId: (skill) => skill.id,
    // Opcionalmente, puedes definir un "sortComparer" para ordenar los grupos
    sortComparer: (a, b) => a.id - (b.id),
})

const initialState = skillAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedSkillId: null
})


export const skillSlice = createSlice({
    name: 'skill',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        setAllSkills: skillAdapter.setAll,
        addSkill: skillAdapter.addOne,
        removeManySkills: skillAdapter.removeMany,
        updateSkill: skillAdapter.updateOne,
        deleteSkill: skillAdapter.removeOne,
        selectSkill: (state, action) => {
            state.selectedSkillId = action.payload; // Actualiza el ID del grupo seleccionado
        },
    },
    // automatic created by thunk 
    extraReducers: (builder) => {
        builder
            .addCase(clearStateAction, (state) => {
                skillAdapter.removeAll(state)
            });
    },
})

export const { 
    addSkill, 
    deleteSkill, 
    updateSkill, 
    selectSkill, 
    setAllSkills, 
    removeManySkills 
} = skillSlice.actions;

// Specific export (inside globals)
export const {
    selectAll: selectAllSkills,
    selectById: selectSkillById,
    selectIds: selectSkillIds,
    selectTotal: selectSkillTotal,
    selectEntities:selectSkillEntities
} = skillAdapter.getSelectors((state) => state.skills);

//Global export
export const skillsSelectors = skillAdapter.getSelectors((state) => state.skills);