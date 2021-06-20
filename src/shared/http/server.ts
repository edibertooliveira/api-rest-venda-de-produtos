import env from 'dotenv';
import AppError from '../errors/ApiError';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
env.config();

import router from './routers/';

const app = express();
const PORT = process.env.PORT;

app.use(cors);
app.use(express.json());
app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
