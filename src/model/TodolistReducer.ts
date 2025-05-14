import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

export type DeleteTodolistActionType = {
    type: 'DELETE',
    payload: {
        id: string
    }
}
export type createTodolistActionType = {
    type: 'CREATE',
    payload: {
        title: string
    }
}
export type changeFilterActionType = {
    type: 'CHANGE FILTER',
    payload: {
        id: string,
        filter: FilterValues
    }
}
export type ChangeTitleActionType = {
    type: 'CHANGE TITLE',
    payload: {
        id: string,
        title: string
    }
}

type  ActionsType = DeleteTodolistActionType | createTodolistActionType | changeFilterActionType | ChangeTitleActionType

export const todolistsReducer = (state = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {

        case 'DELETE': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'CREATE': {
            const todolisId = v1()
            const newTodolist: Todolist = {id: todolisId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE FILTER': {
            const todolistId = action.payload.id
            const filter = action.payload.filter
           return state.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        }
        case 'CHANGE TITLE': {
            const todolistId = action.payload.id
            const title = action.payload.title
           return state.map(t => t.id === todolistId ? {...t, title} : t)
        }

        default: {
            return state
        }
    }
}

export const DeleteTodolistAC = (id: string) => {
    return {
        type: 'DELETE',
        payload: {
            id
        }
    } as const
}
export const createTodolistAC = (title: string) => {
    return {
        type: 'CREATE',
        payload: {
            title
        }
    } as const
}
export const changeFilterAC = (todolistId: string, filter: FilterValues) => {
    return {
        type: 'CHANGE FILTER',
        payload: {
            id: todolistId,
            filter
        }
    } as const
}
export const ChangeTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE TITLE',
        payload: {
            id: todolistId,
            title
        }
    } as const
}