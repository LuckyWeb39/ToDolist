import {createSlice} from "@reduxjs/toolkit"
import {RequestStatus} from "@/common/types";


export const appSlice = createSlice({
    name: "app",

    initialState: {
        themeMode: "dark" as ThemeMode,
        status: "idle" as RequestStatus,
        error: null as string | null
    },

    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
    }),

    selectors: {
        selectThemeMode: state => state.themeMode,
        selectStatus: state => state.status,
        selectAppError: state => state.error,
    }

})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC, setAppStatusAC, setAppErrorAC} = appSlice.actions
export const {selectThemeMode, selectStatus, selectAppError} = appSlice.selectors

export type ThemeMode = "dark" | "light"
