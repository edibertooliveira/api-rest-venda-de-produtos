import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

export default class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return users;
  }
}
