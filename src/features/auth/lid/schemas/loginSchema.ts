import {z} from 'zod/v4'

export type LoginInputs = z.infer<typeof loginSchema>

export const loginSchema = z.object({
    email: z.email({error:'Не валидный Email'}),
    password: z.string().min(3, {error:'Пароль должен быть больше 3 символов'}),
    rememberMe: z.boolean(),
    captcha: z.string().optional(),
})