import { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/ApiError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
export default function isAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('JWT Token is missing.');
  const [_, token] = authHeader.split(' ');
  try {
    verify(token, authConfig.jwt.secret);
    next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
