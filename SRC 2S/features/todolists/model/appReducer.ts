
import {createAction, createReducer} from "@reduxjs/toolkit";


const initialState = {
    themeMode: 'light' as ThemeValue
}

export const changeThemeModeAC = createAction<{themeMode:ThemeValue}>('app/changeThemeMode')



export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            state.themeMode = action.payload.themeMode
        })

})

export type ThemeValue = 'light' | 'dark'
