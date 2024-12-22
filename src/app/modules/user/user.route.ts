import express from 'express';
import { UserControllers } from './user.controller';
import { userValidationSchema } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
