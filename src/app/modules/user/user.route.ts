import express from 'express';
import { UserControllers } from './user.controller';
import { createUserValidationSchema } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
