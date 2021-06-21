import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is already one user with this email', 400);
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);
    return user;
  }
}
