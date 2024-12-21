import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/auth', UserRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.use(globalErrorHandler);

//Not found

export default app;
