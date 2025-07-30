import {DefaultResponse, defaultResponseSchema} from "@/common/types"
import {
  GetTasksResponse,
  getTasksResponseSchema,
  TaskOperationsResponse,
  taskOperationsResponseSchema,
  UpdateTaskModel
} from "./tasksApi.types"
import {baseApi} from "@/app/baseApi.ts";


export const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => ({
        url: `todo-lists/${todolistId}/tasks`,
      }),
      extraOptions: {dataSchema: getTasksResponseSchema },
      providesTags: ['Task']
    }),

    createTask: build.mutation<TaskOperationsResponse, {todolistId: string, title: string}>({
      query: ({todolistId, title}) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body:{title}
      }),
      extraOptions: {dataSchema: taskOperationsResponseSchema },
      invalidatesTags: ['Task']
    }),

    updateTask: build.mutation<TaskOperationsResponse,{ todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({todolistId, taskId, model})=>({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model
      }),
      extraOptions: {dataSchema: taskOperationsResponseSchema },
      invalidatesTags: ['Task']
    }),

    deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId}) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      extraOptions: {dataSchema: defaultResponseSchema },
      invalidatesTags: ['Task']
    })

  })
})

export const {useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation} = taskApi