import {DefaultResponse, defaultResponseSchema} from "@/common/types"
import {
  GetTasksResponse,
  getTasksResponseSchema,
  TaskOperationsResponse,
  taskOperationsResponseSchema,
  UpdateTaskModel
} from "./tasksApi.types"
import {baseApi} from "@/app/baseApi.ts";
import {PAGE_SIZE} from "@/common/constants";


export const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse,
        { todolistId: string; params: {page: number} }>({
      query: ({todolistId, params}) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      extraOptions: {dataSchema: getTasksResponseSchema },
      providesTags: (_res, _error, {todolistId}) => [{type: 'Task', id: todolistId}]
    }),

    createTask: build.mutation<TaskOperationsResponse, {todolistId: string, title: string}>({
      query: ({todolistId, title}) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body:{title}
      }),
      extraOptions: {dataSchema: taskOperationsResponseSchema },
      invalidatesTags: (_res, _error, {todolistId}) => [{type: 'Task', id: todolistId}]
    }),

    updateTask: build.mutation<TaskOperationsResponse,{ todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({todolistId, taskId, model})=>({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model
      }),
      async onQueryStarted({todolistId, taskId, model}, api) {
        const changeArgsForQuery = taskApi.util.selectCachedArgsForQuery(api.getState(),'getTasks')
        let pathRes: any[] = []

        changeArgsForQuery.forEach(({params})=>{
          pathRes.push(
              api.dispatch(
                  taskApi.util.updateQueryData('getTasks',{todolistId, params: {page: params.page}}, state =>{
                    const index = state.items.findIndex(t => t.id === taskId)
                    if (index !== -1){
                      state.items[index] = {...state.items[index], ...model}
                    }
                  })
              )
          )
        })
        try {
          await api.queryFulfilled
        } catch {
          pathRes.forEach(pathRes=>{
            pathRes.undo()
          })
        }
      },
      extraOptions: {dataSchema: taskOperationsResponseSchema },
      invalidatesTags: (_res, _error, {todolistId}) => [{type: 'Task', id: todolistId}],
    }),

    deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId}) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      extraOptions: {dataSchema: defaultResponseSchema },
      invalidatesTags:(_res, _error, {todolistId}) => [{type: 'Task', id: todolistId}],
    })

  })
})

export const {useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation} = taskApi