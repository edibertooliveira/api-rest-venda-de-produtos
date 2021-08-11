import { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/ApiError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function isAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('JWT Token is missing.');
  const [, token] = authHeader.split(' ');
  try {
    const { sub } = verify(token, authConfig.jwt.secret) as ITokenPayload;

    req.user = { id: sub };

    next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
