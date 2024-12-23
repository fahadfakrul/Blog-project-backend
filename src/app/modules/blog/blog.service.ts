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
const updateBlogInDB = async (id: string, userId: string, payload: TBlog) => {
  // Find the blog by its ID and check if the user is the author
  const blog = await Blog.findOne({ _id: id, author: userId });

  if (!blog) {
    throw new Error('Unauthorized to update this blog'); // You can throw an error or handle it as needed
  }

  // If the blog exists and the user is the author, update the blog
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedBlog;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogInDB,
};
