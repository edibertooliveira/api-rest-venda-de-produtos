import { Router } from 'express';
import ProductsController from '../controller/ProductsController';

const productRouter = Router();
const productsController = new ProductsController();

productRouter
  .route('/')
  .get(productsController.index)
  .post(productsController.create);

productRouter
  .route('/:id')
  .get(productsController.show)
  .put(productsController.update)
  .delete(productsController.delete);

export default productRouter;
