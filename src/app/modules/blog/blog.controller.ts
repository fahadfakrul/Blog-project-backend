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
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllBlogsFromDB = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'No blogs created yet',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs fetched successfully',
      data: result,
    });
  }
});

const deleteBlogFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  await BlogServices.deleteBlogFromDB(id, userId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  getAllBlogsFromDB,
  deleteBlogFromDB,
};
