import {
    createTodolistAC,

    deleteTodolistAC,

} from "./TodolistReducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
// import {todolistId1, todolistId2, todolistId3} from "./TodolistReducer.ts";

export type TasksState = Record<string, Task[]>

export type Task = {
    id: string
    title: string
    isDone: boolean
}


const initialState: TasksState = {}

export const deleteTaskAC = createAction<{id:string, taskID:string}>('tasks/deleteTask')
export const createTaskAC = createAction<{id: string, title: string}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{id: string, taskID: string, isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{id: string, taskID: string, title: string}>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.id].findIndex(task => task.id === action.payload.taskID)
            if (index !== -1) {
                state[action.payload.id].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.id].unshift({id:nanoid(),title:action.payload.title, isDone:false})
        })
    .addCase(changeTaskStatusAC, (state, action) => {
        const task = state[action.payload.id].find(task => task.id === action.payload.taskID)
        if (task) {
            task.isDone = action.payload.isDone
        }
    })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.id].find(task => task.id === action.payload.taskID)
            if (task) {
                task.title = action.payload.title
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
})
