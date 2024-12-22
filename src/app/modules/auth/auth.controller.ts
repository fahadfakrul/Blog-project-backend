import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful', // replace with actual JWT token
    statusCode: httpStatus.OK,
    data: result,
  });
});
export const AuthControllers = {
  loginUser,
};
