import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Authentication token is required');
    }

    //check is the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new Error('You are not authorized to access');
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && requiredRoles.includes(role)) {
          throw new Error('You are not authorized to access this resource');
        }
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
