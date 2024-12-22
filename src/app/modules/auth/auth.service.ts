import config from '../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  //checking if user exists in database
  const user = await User.isUserExistByEmail(payload.email);
  if (!user) {
    throw new Error('User not found');
  }
  //checking the user is blocked or not blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new Error('User is blocked');
  }
  //check if the password is correct

  if (!(await User.isPasswordCorrect(payload?.password, user.password))) {
    throw new Error('Invalid password');
  }
  //create token and sent to the client
  const jwtPayload = {
    email: user,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
};
