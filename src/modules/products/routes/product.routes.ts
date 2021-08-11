import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import auth from '../../../shared/http/middlewares/isAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(auth);

productsRouter
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
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);
productsRouter.put(
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
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
