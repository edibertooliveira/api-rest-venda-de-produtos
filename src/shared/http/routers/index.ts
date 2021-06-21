import { Router } from 'express';
import productRouter from '../../../modules/products/routers/product.routes';
import userRouter from '../../../modules/users/routers/user.routes';
import sessionRouter from '../../../modules/users/routers/session.routes';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);

export default routes;
