import {RootState} from "../app/store.ts";
import {Todolist} from "../app/App.tsx";

export const selectorTodolists = (state: RootState): Todolist[] => {
    return state.todolists
}