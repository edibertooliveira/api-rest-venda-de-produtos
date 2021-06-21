import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import jwt from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = jwt.sign({}, '!@#$%*()_+', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
