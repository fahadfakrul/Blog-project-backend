import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { blogValidationSchema } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema),
  BlogControllers.createBlog
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema),
  BlogControllers.updateBlog
);
router.get('/', BlogControllers.getAllBlogsFromDB);
router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  BlogControllers.deleteBlogFromDB
);

export const BlogRoutes = router;
