import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (blogData: TBlog) => {
  const blog = await Blog.create(blogData);
  const populatedBlog = await Blog.findById(blog._id).populate(
    'author',
    'name email role'
  );
  return populatedBlog;
};

export const BlogServices = {
  createBlogIntoDB,
};
