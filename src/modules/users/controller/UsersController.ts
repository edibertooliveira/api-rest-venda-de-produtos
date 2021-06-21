import { Request, Response } from 'express';
import {
  CreateUserService,
  DeleteUserService,
  ListUserService,
  ShowUserService,
  UpdateUserService,
} from '../services/';

export default class UsersController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findUser = new ShowUserService();
    const user = await findUser.execute({ id });
    return res.status(200).json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });
    return res.status(206).json({});
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateUser = new UpdateUserService();
    const user = await updateUser.execute({ id, name, email });
    return res.status(200).json(user);
  }
}
