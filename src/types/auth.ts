import {z} from 'zod';
import { ROLES } from '../utils/enums';


export const userSignUpSchema = z.object({
    userId:z.string(),
    firstName:z.string(),
    lastName:z.string(),
    email: z.string().email(),
    dob:z.string(),
    password: z.string().min(6).max(32),
    rePassword: z.string().min(6).max(32),
    role:z.nativeEnum(ROLES),
    phoneNumber:z.string(),
    address:z.string().optional()
}).strict()


export type userSignUp = z.infer<typeof userSignUpSchema>

export const userLoginSchema = z.object({
  userId:z.string(),
  firstName:z.string(),
  lastName:z.string(),
  email: z.string().email(),
  dob:z.string(),
  password: z.string().min(6).max(32),
  rePassword: z.string().min(6).max(32),
  role:z.nativeEnum(ROLES),
  phoneNumber:z.string(),
  address:z.string().optional()
}).strict()


export type userLogin = z.infer<typeof userLoginSchema>