import { Router } from 'express';
import SessionsController from '../controller/sessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const signRouter = Router();
const sessionsController = new SessionsController();

signRouter.post('/', sessionsController.login);

export default signRouter;
