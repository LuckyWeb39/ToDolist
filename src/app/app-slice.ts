import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit"
import {RequestStatus} from "@/common/types";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {taskApi} from "@/features/todolists/api/tasksApi.ts";


export const appSlice = createSlice({
    name: "app",

    initialState: {
        themeMode: "dark" as ThemeMode,
        status: "idle" as RequestStatus,
        error: null as string | null,
        isLoggedIn: false
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
        setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }),
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {state.status = 'loading'})
            .addMatcher(isFulfilled, (state) => {state.status = 'succeeded'})
            .addMatcher(isRejected, (state) => {state.status = 'failed'})
            .addMatcher(isPending, (state, action) =>{
                if(
                    todolistsApi.endpoints.getTodolists.matchPending(action) ||
                    taskApi.endpoints.getTasks.matchPending(action)
                ) {
                    state.status = 'loading'
                }
            } )
    },

    selectors: {
        selectThemeMode: state => state.themeMode,
        selectStatus: state => state.status,
        selectAppError: state => state.error,
        selectIsLoggedIn: state => state.isLoggedIn
    }

})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC} = appSlice.actions
export const {selectThemeMode, selectStatus, selectAppError, selectIsLoggedIn} = appSlice.selectors

export type ThemeMode = "dark" | "light"
