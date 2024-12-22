import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/blogs',
  //   validateRequest(createUserValidationSchema),
  BlogControllers.createBlog
);

export const BlogRoutes = router;
