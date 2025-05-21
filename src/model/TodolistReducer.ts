import {FilterValues, Todolist} from "../app/App.tsx";

import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


const initialState: Todolist[] = [
]

const deleteTodolistAC = createAction<{id:string}>('todolists/deleteTodolist')
const createTodolistAC = createAction('todolist/createTodolist', (title:string)=>{
    return {payload: {title, todolistId: nanoid()}}
})
const changeTodolistFilterAC = createAction<{todolistId: string, filter:FilterValues}>('todolists/changeFilter')
const changeTodolistTitleAC = createAction<{todolistId: string, title: string}>('todolists/changeTitle')


export const todolistsReducer = createReducer(initialState,builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ id:action.payload.todolistId, title:action.payload.title, filter: 'all' })
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
        if (todolist) {
            todolist.filter = action.payload.filter
        }
    })
})
