import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails = req.body;
    const result = await UserServices.createUserIntoDB(userDetails);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createUser,
};
