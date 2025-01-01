import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  //checking if user exists in database
  const user = await User.isUserExistByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found');
  }
  //checking the user is blocked or not blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }
  //check if the password is correct

  if (!(await User.isPasswordCorrect(payload?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid password');
  }
  //create token and sent to the client
  const jwtPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    token,
  };
};
export const AuthServices = {
  loginUser,
};
