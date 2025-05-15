import {TasksState} from "../App.tsx";
import {v1} from "uuid";


type TasksActionType =
    deleteTaskActionType |
    createTaskActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType |
    deleteTodolistTasksActionType |
    createTasksForNewTodolistActionType

export const TasksReducer = (state: TasksState, action: TasksActionType): TasksState => {
    switch (action.type) {
        case "DELETE_TASK": {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
        }
        case "CREATE_TASK": {
            const {todolistId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        }
        case "CHANGE_TASK_STATUS": {
            const {todolistId, taskId, isDone} = action.payload
            return {...state, [todolistId]: state[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)}
        }
        case "CHANGE_TASK_TITLE": {
            const {todolistID, taskID, title} = action.payload
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, title} : t)}
        }
        case "DELETE_TASKS_WITH_OLD_TODOLIST":{
            delete state[action.payload.todolistId]
            return {...state}
        }
        case "CREATE_TASKS_FOR_NEW_TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        default:
            return state;
    }
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}
type deleteTaskActionType = {
    type: 'DELETE_TASK',
    payload: {
        todolistId: string
        taskId: string
    }
}

export const createTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'CREATE_TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}
type createTaskActionType = {
    type: 'CREATE_TASK',
    payload: {
        todolistId: string,
        title: string
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}
type changeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS',
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistID,
            taskID,
            title
        }
    } as const
}
type changeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    payload: {
        todolistID: string
        taskID: string
        title: string
    }
}

export const deleteTodolistTasksAC = (todolistId: string) => {
    return {
        type: 'DELETE_TASKS_WITH_OLD_TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
type deleteTodolistTasksActionType = {
    type: 'DELETE_TASKS_WITH_OLD_TODOLIST',
    payload: {
        todolistId: string
    }
}

export const createTasksForNewTodolistAC = (todolistId: string) => {
    return {
        type: 'CREATE_TASKS_FOR_NEW_TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
type createTasksForNewTodolistActionType = {
    type: 'CREATE_TASKS_FOR_NEW_TODOLIST',
    payload: {
        todolistId: string
    }
}
