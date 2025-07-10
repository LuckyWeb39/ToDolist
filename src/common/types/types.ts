import {z} from 'zod/v4'
import {ResultCode} from "@/common/enums";

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
    data: schema,
      resultCode: z.enum(ResultCode),
      messages: z.string().array(),
      fieldsErrors: fieldErrorSchema.array()
})

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export const defaultResponseSchema = baseResponseSchema(z.object({}))
export type DefaultResponse = z.infer<typeof defaultResponseSchema>

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type FieldError = z.infer<typeof fieldErrorSchema>
// export type BaseResponse = z.infer<typeof baseResponseSchema>
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'