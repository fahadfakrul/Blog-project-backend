import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, { message: 'Password cannot be less than 20 characters' }),
    role: z.enum(['admin', 'user']).default('user'),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
