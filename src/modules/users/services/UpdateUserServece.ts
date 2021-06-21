import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/ApiError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
export default class UpdateUserService {
  public async execute({ id, name, email }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(email);
    const user = await userRepository.findOne(id);

    if (userExists && user?.id !== id) {
      throw new AppError('There is already one user with this name', 400);
    }

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.name = name;
    user.email = email;

    await userRepository.update(id, user);

    return user;
  }
}
