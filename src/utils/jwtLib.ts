import jwt from 'jsonwebtoken';

import { ROLES } from './enums';

export type tokenData = {
  id: string;
  email: string;
  role: ROLES;
};

const generateJwt = (
  data: Record<string, unknown>,
  admin: boolean,
  expiresIn?: { expiresIn: '30d' }
): string | undefined => {
  const secret =
    (admin ? process.env.JWT_ADMIN_SECRET : process.env.JWT_SECRET) || '';
  if (!secret || secret === '') return;
  return jwt.sign(data, secret, { expiresIn: '30d' });
};

const decodeJwt = (token: string) => {
  return jwt.decode(token) as tokenData;
};

const verifyJwt = (token: string, isAdmin?: boolean) => {
  const secret =
    (isAdmin ? process.env.JWT_ADMIN_SECRET : process.env.JWT_SECRET) || '';

  return jwt.verify(token, secret) as tokenData;
};

export { generateJwt, decodeJwt, verifyJwt };
