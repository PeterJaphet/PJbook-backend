import { NextFunction, Request, Response } from 'express';
import ah from 'express-async-handler';
import { ForbiddenError, UnauthorizedError } from './errorMiddleware';
import { decodeJwt, verifyJwt } from '../utils/jwtLib';
import UserRepo from '../repo/userRepo';
import { ROLES } from '../utils/enums';
import { CustomRequest } from '../utils/requestInterface';
import logger from '../utils/logger';

const auth = () =>
  ah(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedError();

    const decodedToken = decodeJwt(token);
    const user = await UserRepo.find({ _id: decodedToken?.id });

    try {
      verifyJwt(token, decodedToken?.role === ROLES.ADMIN);
    } catch (error) {
      logger.err(error);
      throw new UnauthorizedError();
    }
    if (!user) throw new UnauthorizedError(`User not found!`);

    if (decodedToken.role === ROLES.AUTHOR && !user.verified)
      throw new ForbiddenError('Author is not verified yet!');

    if (!user.isActive) throw new ForbiddenError(`${user.role} is inactive!`);

    req.tokenData = decodedToken;

    next();
  });

export { auth };
