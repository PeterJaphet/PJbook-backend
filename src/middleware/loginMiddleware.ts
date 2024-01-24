import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export default function checkLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info('Current user is:', req.user);
  const isLoggedin = req.isAuthenticated() && req.user;
  if (!isLoggedin) {
    return res.status(401).json({
      error: 'You must Log in!',
    });
  }
  next();
}
