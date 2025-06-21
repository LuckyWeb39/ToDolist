import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "@/features/todolists/model/TasksReducer.ts";
import {todolistsReducer} from "@/features/todolists/model/TodolistReducer.ts";
import {appReducer} from "@/features/todolists/model/appReducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export const store = configureStore({
    reducer:rootReducer})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store