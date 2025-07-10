
import {z} from "zod/v4"
import {TaskPriority, TaskStatus} from "@/common/enums";
import {baseResponseSchema} from "@/common/types";



export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id:z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({local:true})
})
export type DomainTask = z.infer<typeof domainTaskSchema>


export const getTasksResponseSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: domainTaskSchema.array()
})
export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>

export const taskOperationsResponseSchema = baseResponseSchema(z.object({
  item: domainTaskSchema
}))

export type TaskOperationsResponse = z.infer<typeof taskOperationsResponseSchema>


export type UpdateTaskModel = {
  description: string | null,
  title: string,
  status: TaskStatus,
  priority: TaskPriority,
  startDate: string | null,
  deadline: string | null,
}

