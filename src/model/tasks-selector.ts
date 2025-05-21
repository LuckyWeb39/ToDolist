import {RootState} from "../app/store.ts";
import {TasksState} from "../app/App.tsx";

export const selectorTasks = (state: RootState): TasksState => {
    return state.tasks
}