import {z} from 'zod/v4'
import {baseResponseSchema} from "@/common/types";


export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({local:true}),
  order: z.int()
})

export const createTodolistResponseSchema = baseResponseSchema(z.object({
  item: todolistSchema,
}))

export type createTodolistResponse = z.infer<typeof createTodolistResponseSchema>

export type Todolist = z.Infer<typeof todolistSchema>
