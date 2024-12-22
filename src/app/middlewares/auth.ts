import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Authentication token is required');
    }
    next();
  });
};

export default auth;
