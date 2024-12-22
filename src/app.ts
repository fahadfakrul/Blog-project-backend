import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});
// global error handler
app.use(globalErrorHandler);

//Not found
app.use(notFound);

export default app;
