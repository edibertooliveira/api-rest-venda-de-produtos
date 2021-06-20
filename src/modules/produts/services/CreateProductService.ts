import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/productsRepository';
import Product from '../typeorm/entities/Product';
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });
    await productRepository.save(product);
    return product;
  }
}
