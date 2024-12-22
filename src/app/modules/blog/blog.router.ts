import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { createBlogValidationSchema } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createBlogValidationSchema),
  BlogControllers.createBlog
);

export const BlogRoutes = router;
