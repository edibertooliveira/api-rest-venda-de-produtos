import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IPaginateProduct {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Product[];
}

export default class ListProductsService {
  public async execute(): Promise<IPaginateProduct> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IPaginateProduct>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = (await productsRepository
        .createQueryBuilder()
        .paginate()) as IPaginateProduct;
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}
