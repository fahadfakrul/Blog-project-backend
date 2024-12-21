import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
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

export default app;
