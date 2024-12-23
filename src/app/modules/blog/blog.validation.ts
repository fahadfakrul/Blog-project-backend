import { z } from 'zod';

export const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be string',
    }),
    content: z.string({
      invalid_type_error: 'Content must be string',
    }),
  }),
});

export const BlogValidation = {
  blogValidationSchema,
};
