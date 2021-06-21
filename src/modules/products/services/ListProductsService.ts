import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/productsRepository';
import Product from '../typeorm/entities/Product';

export default class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = await productRepository.find();
    return products;
  }
}
