import {instance} from "@/common/instance"
import {BaseResponse, DefaultResponse} from "@/common/types"
import type {createTodolistResponse, Todolist} from "./todolistsApi.types"

import {baseApi} from "@/app/baseApi.ts";
import {DomainTodolists} from "@/features/todolists/lib/types";

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<DefaultResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<createTodolistResponse>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<DefaultResponse>(`/todo-lists/${id}`)
  },
}

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getTodolists: build.query<any[],void>({
      query: ()=> 'todo-lists',
      transformResponse: (todolists: Todolist[]): DomainTodolists[] =>
          todolists.map((todolist) => ({...todolist, filter: 'all', entityStatus: 'idle'})),
      providesTags: ['Todolist'],
    }),

    addTodolist: build.mutation<BaseResponse<{ item: Todolist}>, string>({
      query: (title) => ({
        url: 'todo-lists',
        method: 'POST',
        body: {title}
      }),
      invalidatesTags:['Todolist'],
    }),

    removeTodolist: build.mutation<BaseResponse, string>({
      query: (todolistId) => ({
        url: `todo-lists/${todolistId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['Todolist'],
    }),

    updateTodolistTitle: build.mutation<BaseResponse, { todolistId: string, title: string }>({
      query: ({todolistId, title}) => ({
        url: `todo-lists/${todolistId}`,
        method: 'PUT',
        body: {title},
      }),
      invalidatesTags:['Todolist'],
    }),


  })
})

export const { useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistTitleMutation} = todolistsApi
