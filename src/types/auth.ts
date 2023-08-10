import {z} from 'zod';

const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    PRO: 'pro',
  }

export const userLoginSchema = z.object({
    userId:z.string(),
    firstName:z.string(),
    lastName:z.string(),
    email: z.string().email(),
    dob:z.string(),
    password: z.string().min(6).max(32),
    role:z.nativeEnum(ROLES),
    phoneNumber:z.string(),
    address:z.string().optional()

}).strict()


export type userLogin = z.infer<typeof userLoginSchema>