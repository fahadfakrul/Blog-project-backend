import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .max(20, { message: 'Password cannot be less than 20 characters' }),
  role: z.enum(['admin', 'user']).default('user'),
  isBlocked: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
