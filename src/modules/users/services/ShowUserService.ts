import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/ApiError';

interface IRequest {
  id: string;
}
export default class ShowUserService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
