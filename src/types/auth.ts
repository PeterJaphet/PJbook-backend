import {z} from 'zod';

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
}).strict()


export type userLogin = z.infer<typeof userLoginSchema>