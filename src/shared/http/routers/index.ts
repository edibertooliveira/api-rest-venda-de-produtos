import { Router } from 'express';
import customersRouter from '@modules/custormers/routes/customer.routes';
import ordersRouter from '@modules/orders/routes/order.routes';
import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/products', productRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
