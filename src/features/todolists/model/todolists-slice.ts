import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";


export const todolistsSlice = createSlice({
    name: 'todolists',

    initialState: [] as DomainTodolists[],

    reducers: create => ({
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),

    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_state,action)=>{
                return action.payload.todolists.map(t => {
                    return {...t, filter: 'all'}
                })
            })
            .addCase(fetchTodolistsTC.rejected, (_state, action)=>{
                console.log(action.payload)
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action)=>{
                const t = state.find((t) => t.id === action.payload.id)
                if (t) {
                    t.title = action.payload.title
                }
            })
            .addCase(createTodolistTC.fulfilled, (state, action)=>{
                state.push({id: action.payload.id, title: action.payload.title, filter: 'all', addedDate: '', order: 0})
            })
            .addCase(deleteTodolistTC.fulfilled,(state,action)=>{
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            } )
    },
    selectors:{
        selectTodolists: state => state
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {changeTodolistFilterAC} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors



export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_arg, thunkAPI) => {
        try{
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
        }
        catch(err) {
          return thunkAPI.rejectWithValue(err)
        }

    }
)

export const changeTodolistTitleTC = createAsyncThunk (
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (payload:{title: string, id: string}, thunkAPI) => {
        try {
            await todolistsApi.changeTodolistTitle(payload)
            return payload
        }
        catch(err) {
           return thunkAPI.rejectWithValue(err)
        }
    }
)

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async(title: string, thunkAPI) => {
        try {
            const res = await todolistsApi.createTodolist(title)
            return res.data.data.item
        }
        catch(err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (payload:{id: string}, thunkAPI) => {
        try{
            await todolistsApi.deleteTodolist(payload.id)
            return payload
        }
        catch(err) {
            return thunkAPI.rejectWithValue(err)
        }


    }
)

export type DomainTodolists = Todolist & {
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
