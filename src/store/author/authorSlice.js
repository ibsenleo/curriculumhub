import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// import { fetchAuthorsThunk } from "./authorThunks";
import { clearStateAction } from "../common/actions/clearStateAction";

const authorAdapter = createEntityAdapter({
    // Definir el "selectId" para especificar cuál es el ID del grupo
    selectId: (author) => author.id,
    // Opcionalmente, puedes definir un "sortComparer" para ordenar los grupos
    sortComparer: (a, b) => a.id - (b.id),
})

const initialState = authorAdapter.getInitialState({
    isLoading: false,
    error: null,
    selectedAuthorId: null
})


export const authorSlice = createSlice({
    name: 'author',
    initialState: initialState,
    // "mutations" to state
    reducers: {
        setAuthors: authorAdapter.setAll,
        addAuthor: authorAdapter.addOne,
        updateAuthor: authorAdapter.updateOne,
        deleteAuthor: authorAdapter.removeOne,
        selectAuthor: (state, action) => {
            state.selectedAuthorId = action.payload; // Actualiza el ID del grupo seleccionado
        },
    }
})

export const { addAuthor, deleteAuthor, updateAuthor, selectAuthor, setAuthors } = authorSlice.actions;

// Specific export (inside globals)
export const {
    selectAll: selectAllAuthors,
    selectById: selectAuthorById,
    selectIds: selectAuthorIds,
} = authorAdapter.getSelectors((state) => state.authors);

//Global export
export const authorsSelectors = authorAdapter.getSelectors((state) => state.authors);