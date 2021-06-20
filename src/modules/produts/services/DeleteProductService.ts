import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/productsRepositories';
import AppError from 'src/shared/errors/ApiError';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findOne(id);

    if (productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await productRepository.remove(product);
  }
}
