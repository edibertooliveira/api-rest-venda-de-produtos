import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { ProfileController } from '../controllers';
import auth from '../../../shared/http/middlewares/isAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/', auth, profileController.show);

profileRouter.put(
  '/',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(4),
      email: Joi.string().email(),
      password: Joi.string().min(8).required(),
      old_password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
