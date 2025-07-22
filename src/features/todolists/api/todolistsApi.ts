import {instance} from "@/common/instance"
import {DefaultResponse} from "@/common/types"
import type {createTodolistResponse, Todolist} from "./todolistsApi.types"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";

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

export const todolistApi = createApi({
  reducerPath: "todolists",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders:(headers)=>{
      headers.set('API-KEY', import.meta.env.VITE_API_KEY)
      headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<any[],void>({
      query: ()=> 'todo-lists',
    })
  })
})

export const { useGetTodolistsQuery} = todolistApi
