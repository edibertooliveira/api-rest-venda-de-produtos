import { Router } from 'express';
import { CustomersController } from '@modules/custormers/controllers';
import { celebrate, Joi, Segments } from 'celebrate';
import auth from '../../../shared/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(auth);

customersRouter
  .route('/')
  .get(customersController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
      },
    }),
    customersController.create,
  );
customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);
customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(4).required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.update,
);
customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
