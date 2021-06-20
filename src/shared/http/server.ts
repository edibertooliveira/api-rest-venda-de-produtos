import env from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routers';
import AppError from '../errors/ApiError';
import '../typeorm';
env.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err.message);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
