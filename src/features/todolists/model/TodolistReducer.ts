
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

const initialState: Todolist[] = [
]

export const deleteTodolistAC = createAction<{id:string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolist/createTodolist', (title:string)=>{
    return {payload: {title, id: nanoid()}}
})
export const changeTodolistFilterAC = createAction<{id: string, filter:FilterValues}>('todolists/changeFilter')
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTitle')


export const todolistsReducer = createReducer(initialState,builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ id:action.payload.id, title:action.payload.title, filter: 'all' })
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id)
        if (todolist) {
            todolist.filter = action.payload.filter
        }
    })
})
