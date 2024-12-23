import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'internal server error';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 200;
    message = 'Validation error';
  }
  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSources,
    error: err,
  });
};

export default globalErrorHandler;
