import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const blogDetails = req.body;
  const { _id: userId } = req.user;

  const result = await BlogServices.createBlogIntoDB({
    ...blogDetails,
    author: userId,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogDetails = req.body;
  const { _id: userId } = req.user;
  const result = await BlogServices.updateBlogInDB(id, userId, blogDetails);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
};
