import {RootState} from "../../../app/store.ts";
import {TasksState} from "@/features/todolists/model/TasksReducer.ts";


export const selectorTasks = (state: RootState): TasksState => {
    return state.tasks
}