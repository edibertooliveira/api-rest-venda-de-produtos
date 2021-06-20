import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productRouter = Router();
const productsController = new ProductsController();

productRouter
  .route('/')
  .get(productsController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
      },
    }),
    productsController.create,
  );

productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);
productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.update,
);
productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productRouter;
