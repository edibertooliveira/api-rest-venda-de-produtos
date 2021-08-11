import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { UsersAvatarController, UsersController } from '../controllers';
import auth from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '../../../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

usersRouter
  .route('/')
  .get(usersController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      },
    }),
    usersController.create,
  );

usersRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
