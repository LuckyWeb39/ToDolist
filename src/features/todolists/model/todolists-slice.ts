import {createTodolistResponseSchema, Todolist, todolistSchema} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {createAppSlice} from "@/common/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {defaultResponseSchema, RequestStatus} from "@/common/types";
import {ResultCode} from "@/common/enums";
import {handleServerAppError} from "@/common/utils/handleServerAppError.ts";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError.ts";


export const todolistsSlice = createAppSlice({
    name: 'todolists',

    initialState: [] as DomainTodolists[],

    reducers: create => ({
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),

        changeTodolistStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        }),

        fetchTodolistsTC: create.asyncThunk(
            async (_arg, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                    const res = await todolistsApi.getTodolists()
                    todolistSchema.array().parse(res.data) // 💎
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return {todolists: res.data}
                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (_state, action) => {
                    return action.payload.todolists.map(t => {
                        return {...t, filter: 'all', entityStatus: 'idle'}
                    })
                }
            }
        ),

        createTodolistTC: create.asyncThunk(
            async (title: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                    const res = await todolistsApi.createTodolist(title)

                    createTodolistResponseSchema.parse(res.data) // 💎

                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                        return res.data.data.item
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }

                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({
                        id: action.payload.id,
                        title: action.payload.title,
                        filter: 'all',
                        addedDate: action.payload.addedDate,
                        order: action.payload.order,
                        entityStatus: 'idle',
                    })
                }
            }
        ),
        deleteTodolistTC: create.asyncThunk(
            async (payload: { id: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                    thunkAPI.dispatch(changeTodolistStatusAC({id: payload.id, entityStatus: 'loading'}))
                    const res = await todolistsApi.deleteTodolist(payload.id)

                    defaultResponseSchema.parse(res.data) //💎

                    if (res.data.resultCode === ResultCode.Success) {
                        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                        return payload
                    } else {
                        thunkAPI.dispatch(changeTodolistStatusAC({id: payload.id, entityStatus: 'failed'}))
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (err) {
                    thunkAPI.dispatch(changeTodolistStatusAC({id: payload.id, entityStatus: 'failed'}))
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                }
            }
        ),
        changeTodolistTitleTC: create.asyncThunk(
            async (payload: { title: string, id: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                    const res = await todolistsApi.changeTodolistTitle(payload)

                    defaultResponseSchema.parse(res.data) //💎

                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return payload
                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    const t = state.find((t) => t.id === action.payload.id)
                    if (t) {
                        t.title = action.payload.title
                    }
                }
            }
        )
    }),
    selectors: {
        selectTodolists: state => state
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    changeTodolistFilterAC,
    changeTodolistStatusAC,
    fetchTodolistsTC,
    createTodolistTC,
    deleteTodolistTC,
    changeTodolistTitleTC
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export type DomainTodolists = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
