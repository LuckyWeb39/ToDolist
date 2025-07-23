import {instance} from "@/common/instance"
import {DefaultResponse} from "@/common/types"
import type {GetTasksResponse, TaskOperationsResponse, UpdateTaskModel} from "./tasksApi.types"
import {baseApi} from "@/app/baseApi.ts";

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<TaskOperationsResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<TaskOperationsResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<DefaultResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

export const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => ({
        url: `todo-lists/${todolistId}/tasks`,
      }),
      providesTags: ['Task']
    }),

    createTask: build.mutation<TaskOperationsResponse, {todolistId: string, title: string}>({
      query: ({todolistId, title}) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body:{title}
      }),
      invalidatesTags: ['Task']
    }),

    updateTask: build.mutation<TaskOperationsResponse,{ todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({todolistId, taskId, model})=>({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model
      }),
      invalidatesTags: ['Task']
    }),

    deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId}) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task']
    })

  })
})

export const {useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation} = taskApi