import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const { email } = userData;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Email is already in use');
  }
  const result = await User.create(userData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
