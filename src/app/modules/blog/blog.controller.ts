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

const getAllBlogsFromDB = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'No blogs created yet',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blogs fetched successfully',
      data: result,
    });
  }
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  getAllBlogsFromDB,
};
