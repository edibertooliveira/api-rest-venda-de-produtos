import { Router } from 'express';
import productRouter from '../../../modules/produts/routers/product.routes';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
