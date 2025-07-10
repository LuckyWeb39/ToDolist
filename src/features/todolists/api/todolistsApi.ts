import {instance} from "@/common/instance"
import {DefaultResponse} from "@/common/types"
import type {createTodolistResponse, Todolist} from "./todolistsApi.types"

export const todolistsApi = {
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
