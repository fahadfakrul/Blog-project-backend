import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchableFields } from './blog.constant';

const createBlogIntoDB = async (blogData: TBlog) => {
  const blog = await Blog.create(blogData);
  const populatedBlog = await Blog.findById(blog._id).populate(
    'author',
    'name email role'
  );
  return populatedBlog;
};
const updateBlogInDB = async (id: string, userId: string, payload: TBlog) => {
  const blog = await Blog.findOne({ _id: id, author: userId });

  if (!blog) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Unauthorized to update this blog'
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedBlog;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', '-password'),
    query
  )
    .search(blogSearchableFields)
    .filter()
    .sortBy()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  return result;
};

const deleteBlogFromDB = async (id: string, userId: string) => {
  const blog = await Blog.findOne({ _id: id, author: userId });
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  await Blog.findByIdAndDelete(id);
  return { message: 'Blog deleted successfully' };
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogInDB,
  getAllBlogsFromDB,
  deleteBlogFromDB,
};
