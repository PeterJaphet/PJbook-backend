import { z } from 'zod';
import { ROLES } from '../utils/enums';
import mongoose from 'mongoose';

export const userSignUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    dob: z.string(),
    password: z.string().min(6).max(32),
    role: z.nativeEnum(ROLES),
    phoneNumber: z.string(),
    avatar: z.string(),
    address: z.string().optional(),
  })
  .strict();
export type userSignUp = z.infer<typeof userSignUpSchema>;

export const updateUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    dob: z.string(),
    password: z.string().min(6).max(32),
    role: z.nativeEnum(ROLES),
    phoneNumber: z.string(),
    avatar: z.string(),
    address: z.string().optional(),
    verified: z.boolean().default(false),
    isActive: z.boolean().default(false),
  })
  .strict();
export type updatedUser = z.infer<typeof updateUserSchema>;

export const userLoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })
  .strict();
export type userLogin = z.infer<typeof userLoginSchema>;

export const userChangePasswordSchema = z
  .object({
    email: z.string().email(),
    oldPassword: z.string().min(6).max(32),
    newPassword: z.string().min(6).max(32),
  })
  .strict();
export type userChangePassword = z.infer<typeof userChangePasswordSchema>;

export const getUserSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();
export type getUser = z.infer<typeof getUserSchema>;

export const otpSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();
export type otpType = z.infer<typeof otpSchema>;

export interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

// export interface IUser extends mongoose.Document {
//   firstName: {
//     type: String;
//     required: true;
//     trim: true;
//   };

//   lastName: {
//     type: String;
//     required: true;
//     trim: true;
//   };
//   email: {
//     type: String;
//     required: true;
//     trim: true;
//     unique: true;
//   };
//   dob: {
//     type: String;
//     required: true;
//   };
//   password: {
//     type: String;
//     required: true;
//   };
//   role: {
//     type: String;
//     required: true;
//     enum: ROLES;
//   };
//   phoneNumber: {
//     type: String;
//     required: true;
//   };
//   address: {
//     type: String;
//   };
//   avatar: {
//     type: String;
//   };
//   verified: {
//     type: Boolean;
//     default: false;
//   };
//   isActive: {
//     type: Boolean;
//     default: false;
//   };
// }
