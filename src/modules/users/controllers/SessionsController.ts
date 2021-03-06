import { Request, Response } from 'express';
import { CreateSessionService } from '../services';

export default class SessionsController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const loginUser = new CreateSessionService();
    const users = await loginUser.execute({ email, password });
    return res.status(200).json(users);
  }
}
