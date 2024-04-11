import { Request } from 'express';
import { ROLES } from './enums';

export interface CustomRequest extends Request {
  tokenData?: {
    email?: string;
    id: string;
    role: ROLES;
  };
}
