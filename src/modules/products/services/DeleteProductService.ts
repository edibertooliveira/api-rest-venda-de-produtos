import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '../../../shared/errors/ApiError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findOne(id);

    if (!productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}
