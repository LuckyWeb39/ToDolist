import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {createAppSlice} from "@/common/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";


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
        fetchTodolistsTC: create.asyncThunk(
            async (_arg, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.getTodolists()
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return {todolists: res.data}
                } catch (err) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(err)
                }
            }, {
                fulfilled: (_state, action) => {
                    return action.payload.todolists.map(t => {
                        return {...t, filter: 'all'}
                    })
                },
                rejected: (_state, action) => {
                    alert(action.payload)
                }
            }
        ),
        createTodolistTC: create.asyncThunk(
            async (title: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await todolistsApi.createTodolist(title)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return res.data.data.item
                } catch (err) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(err)
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
                    })
                },
                rejected: (_state, action) => {
                    alert(action.payload)
                }
            }
        ),
        deleteTodolistTC: create.asyncThunk(
            async (payload: { id: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.deleteTodolist(payload.id)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return payload
                } catch (err) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(err)
                }
            }, {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                },
                rejected: (_state, action) => {
                    alert(action.payload)
                }
            }
        ),
        changeTodolistTitleTC: create.asyncThunk(
            async (payload: { title: string, id: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    await todolistsApi.changeTodolistTitle(payload)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return payload
                } catch (err) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(err)
                }
            }, {
                fulfilled: (state, action) => {
                    const t = state.find((t) => t.id === action.payload.id)
                    if (t) {
                        t.title = action.payload.title
                    }
                },
                rejected: (_state, action)=>{
                    alert(action.payload)
                }
            }
        )
    }),
    selectors: {
        selectTodolists: state => state
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {changeTodolistFilterAC, fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export type DomainTodolists = Todolist & {
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
