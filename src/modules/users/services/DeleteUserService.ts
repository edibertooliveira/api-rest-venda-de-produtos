import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '../../../shared/errors/ApiError';

interface IRequest {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findOne(id);

    if (!userExists) {
      throw new AppError('There is already one user with this name', 400);
    }

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('user not found', 404);
    }

    await userRepository.remove(user);
  }
}
