import { Router } from 'express';
import { OrdersController } from '@modules/orders/controllers';
import { celebrate, Joi, Segments } from 'celebrate';
import auth from '../../../shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(auth);

ordersRouter.route('/').post(
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.array().min(1).required(),
    },
  }),
  ordersController.create,
);
ordersRouter.get('/:id', ordersController.show);

export default ordersRouter;
