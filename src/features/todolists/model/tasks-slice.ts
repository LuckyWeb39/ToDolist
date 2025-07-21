import {createTodolistTC, deleteTodolistTC} from "./todolists-slice.ts"
import {createAppSlice} from "@/common/utils";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {
    DomainTask,
    getTasksResponseSchema,
    taskOperationsResponseSchema,
    UpdateTaskModel
} from "@/features/todolists/api/tasksApi.types.ts";
import {RootState} from "@/app/store.ts";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {ResultCode} from "@/common/enums";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError.ts";
import {handleServerAppError} from "@/common/utils/handleServerAppError.ts";
import {defaultResponseSchema} from "@/common/types";
import {clearDataAC} from "@/common/common";


export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    reducers: create => ({

        fetchTasksTC: create.asyncThunk(
            async (todolistId: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.getTasks(todolistId)
                    getTasksResponseSchema.parse(res.data) // 💎
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return {todolistId, tasks: res.data.items}
                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    console.log(err)
                    return thunkAPI.rejectWithValue(null)

                }
            }, {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }
        ),

        createTaskTC: create.asyncThunk(
            async (arg: { todolistId: string, title: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.createTask(arg)

                    taskOperationsResponseSchema.parse(res.data) // 💎

                    if (res.data.resultCode === ResultCode.Success){
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return {todolistId: arg.todolistId, task: res.data.data.item}
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId].unshift(action.payload.task)
                },
                rejected: (_state, action) => {
                    action.payload
                }
            }
        ),

        deleteTaskTC: create.asyncThunk(
            async (arg: { todolistId: string, taskId: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.deleteTask(arg)

                    defaultResponseSchema.parse(res.data) // 💎

                    if (res.data.resultCode === ResultCode.Success){
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return arg
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(err)
                }
            }, {
                fulfilled: (state, action) => {
                    const index = state[action.payload.todolistId].findIndex((t)=>t.id === action.payload.taskId)
                    if (index !== -1) {
                        state[action.payload.todolistId].splice(index, 1)
                    }
                }
            }
        ),
        updateTaskTC: create.asyncThunk(
            async (
                arg: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
                thunkAPI
            ) => {
                const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[arg.todolistId]
                        const task = allTodolistTasks.find(task => task.id === arg.taskId)

                        if (!task) {
                            return thunkAPI.rejectWithValue(null)
                        }
                        const model: UpdateTaskModel = {
                            ...task,
                            ...arg.domainModel,
                        }
                        try{
                            thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                            const res = await tasksApi.updateTask({todolistId: arg.todolistId, taskId: arg.taskId, model})

                            taskOperationsResponseSchema.parse(res.data) // 💎

                            if(res.data.resultCode === ResultCode.Success){
                                thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                                return {task: res.data.data.item}
                            } else {
                                handleServerAppError(res.data, thunkAPI.dispatch)
                                return thunkAPI.rejectWithValue(null)
                            }
                        } catch (err){
                            handleServerNetworkError(err, thunkAPI.dispatch)
                            return thunkAPI.rejectWithValue(null)
                        }

            },
            { fulfilled: (state, action) => {
                const task = state[action.payload.task.todoListId].find(t=>t.id===action.payload.task.id)
                    if(task){
                        task.status = action.payload.task.status
                        task.title = action.payload.task.title
                    }

                } }
        )
    }),

    extraReducers: builder => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(clearDataAC, () => {
                return {}
            })
    },
    selectors:
        {
            selectTasks: state => state
        }
})

export const tasksReducer = tasksSlice.reducer
export const {
    fetchTasksTC,
    createTaskTC,
    deleteTaskTC,
    updateTaskTC,
} = tasksSlice.actions
export const {selectTasks} = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
