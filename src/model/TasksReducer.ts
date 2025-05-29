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

export const deleteTaskAC = createAction<{todolistId:string, taskId:string}>('tasks/deleteTask')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistID: string, taskID: string, title: string}>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({id:nanoid(),title:action.payload.title, isDone:false})
        })
    .addCase(changeTaskStatusAC, (state, action) => {
        const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
        if (task) {
            task.isDone = action.payload.isDone
        }
    })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistID].find(task => task.id === action.payload.taskID)
            if (task) {
                task.title = action.payload.title
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
})
