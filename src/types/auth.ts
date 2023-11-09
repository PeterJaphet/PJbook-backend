import { z } from 'zod';
import { ROLES } from '../utils/enums';

export const userSignUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    dob: z.string(),
    password: z.string().min(6).max(32),
    role: z.nativeEnum(ROLES),
    phoneNumber: z.string(),
    address: z.string().optional(),
  })
  .strict();
export type userSignUp = z.infer<typeof userSignUpSchema>;

export const userLoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })
  .strict();
export type userLogin = z.infer<typeof userLoginSchema>;

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
export const confirmOtpSchema = userLoginSchema.extend({
  otp: z.number().int(),
})
export type confirmOtpType = z.infer<typeof confirmOtpSchema>
=======
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
