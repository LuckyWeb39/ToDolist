import {RootState} from "../../../app/store.ts";
import {Todolist} from "@/features/todolists/model/TodolistReducer.ts";

export const selectorTodolists = (state: RootState): Todolist[] => {
    return state.todolists
}