import {TasksState} from "../app/App.tsx";
import {createTodolistActionType, DeleteTodolistActionType} from "./TodolistReducer.ts";
import {nanoid} from "@reduxjs/toolkit";
// import {todolistId1, todolistId2, todolistId3} from "./TodolistReducer.ts";


type TasksActionType =
    deleteTaskActionType |
    createTaskActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType |
    createTodolistActionType |
    DeleteTodolistActionType



const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: TasksActionType): TasksState => {
    switch (action.type) {
        case "DELETE_TASK": {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
        }
        case "CREATE_TASK": {
            const {todolistId, title} = action.payload
            const newTask = {id: nanoid(), title, isDone: false}
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
        case "CREATE": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "DELETE": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
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


