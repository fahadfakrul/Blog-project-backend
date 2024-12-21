import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userDetails = req.body;
    const result = await UserServices.createUserIntoDB(userDetails);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Validation error' });
  }
};

export const UserControllers = {
  createUser,
};
