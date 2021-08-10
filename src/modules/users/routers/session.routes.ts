import { Router } from 'express';
import { SessionsController } from '../controller/';
import { celebrate, Joi, Segments } from 'celebrate';

const signRouter = Router();
const sessionsController = new SessionsController();

signRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().length(8).required(),
    },
  }),
  sessionsController.login,
);

export default signRouter;
