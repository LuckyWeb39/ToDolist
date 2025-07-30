import {BaseResponse, defaultResponseSchema} from "@/common/types"
import {Todolist, todolistSchema} from "./todolistsApi.types"

import {baseApi} from "@/app/baseApi.ts";
import {DomainTodolists} from "@/features/todolists/lib/types";


export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getTodolists: build.query<any[],void>({
      query: ()=> 'todo-lists',
      transformResponse: (todolists: Todolist[]): DomainTodolists[] =>
          todolists.map((todolist) => ({...todolist, filter: 'all', entityStatus: 'idle'})),
      extraOptions: {dataSchema: todolistSchema.array()},
      providesTags: ['Todolist'],
    }),

    addTodolist: build.mutation<BaseResponse<{ item: Todolist}>, string>({
      query: (title) => ({
        url: 'todo-lists',
        method: 'POST',
        body: {title}
      }),
      extraOptions: {dataSchema: defaultResponseSchema},
      invalidatesTags:['Todolist'],
    }),

    removeTodolist: build.mutation<BaseResponse, string>({
      query: (todolistId) => ({
        url: `todo-lists/${todolistId}`,
        method: 'DELETE',
      }),
      extraOptions: {dataSchema: defaultResponseSchema},
      invalidatesTags:['Todolist'],
    }),

    updateTodolistTitle: build.mutation<BaseResponse, { todolistId: string, title: string }>({
      query: ({todolistId, title}) => ({
        url: `todo-lists/${todolistId}`,
        method: 'PUT',
        body: {title},
      }),
      extraOptions: {dataSchema: defaultResponseSchema},
      invalidatesTags:['Todolist'],
    }),


  })
})

export const { useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistTitleMutation} = todolistsApi
