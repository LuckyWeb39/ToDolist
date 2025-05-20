import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../module/TasksReducer.ts";
import {todolistsReducer} from "../module/TodolistReducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = configureStore({
    reducer:rootReducer})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store