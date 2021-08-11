import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '../../../shared/errors/ApiError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

    if (productExists && product?.id !== id) {
      throw new AppError('There is already one product with this name', 400);
    }

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.update(id, product);

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}
