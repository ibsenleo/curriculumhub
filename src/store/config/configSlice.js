import { createSlice } from "@reduxjs/toolkit";
import { loadConfigData } from "../../helpers/config";

// Estado inicial usando el adapter
const initialState = loadConfigData()

// Crear el slice para los usuarios
export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setDarkTheme: (state, action) => {
            state.isDarkTheme = action.payload
        }
    },
});


export const { setDarkTheme } = configSlice.actions;