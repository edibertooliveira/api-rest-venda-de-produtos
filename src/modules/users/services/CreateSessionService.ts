import AppError from '../../../shared/errors/ApiError';
import authConfig from '../../../config/auth';
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

    const token = jwt.sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
