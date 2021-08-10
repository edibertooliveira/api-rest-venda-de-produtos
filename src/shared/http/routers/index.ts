import { Router } from 'express';
import productRouter from '@modules/products/routers/product.routes';
import userRouter from '@modules/users/routers/user.routes';
import sessionRouter from '@modules/users/routers/session.routes';
import passwordRouter from '@modules/users/routers/password.routes';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter);

export default routes;
