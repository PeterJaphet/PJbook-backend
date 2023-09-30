import {z} from 'zod';

const ROLES = {
    Reader: 'reader',
    Author: 'author',
    Admin: 'admin'
  }

export const userSignUpSchema = z.object({
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


export type userLogin = z.infer<typeof userSignUpSchema>