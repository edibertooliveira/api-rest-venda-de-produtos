import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/ApiError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import uploadConfig from '../../../config/upload';

interface IRequest {
  user_Id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_Id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_Id);
    if (!user) {
      throw new AppError('user not found', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.update(user_Id, user);
    return user;
  }
}
