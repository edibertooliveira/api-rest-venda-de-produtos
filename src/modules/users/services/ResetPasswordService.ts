import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/typeorm/repositories/UsersTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository);
    const userToken = await usersTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('User Token does not exists.');
    const user = await usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User does not exists.');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
