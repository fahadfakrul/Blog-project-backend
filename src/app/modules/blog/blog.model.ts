import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: [true, 'Please provide blog title.'] },
    content: { type: String, required: [true, 'Please provide your content.'] },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author id is required.'],
      unique: true,
      ref: 'User',
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Blog = model<TBlog>('Blog', blogSchema);
