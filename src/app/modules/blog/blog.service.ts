import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (blogData: TBlog) => {
  const result = await Blog.create(blogData);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
};
