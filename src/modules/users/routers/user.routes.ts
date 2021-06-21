import { Router } from 'express';
import UsersController from '../controller/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import auth from '../../../shared/http/middlewares/isAuthenticated';
const usersRouter = Router();
const usersController = new UsersController();

usersRouter
  .route('/')
  .get(usersController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().length(8).required(),
      },
    }),
    usersController.create,
  );

usersRouter.get(
  '/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);
usersRouter.put(
  '/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(4).required(),
      email: Joi.string().email().required(),
    },
  }),
  usersController.update,
);
usersRouter.delete(
  '/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

export default usersRouter;
