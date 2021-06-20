import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/productsRepositories';
import Product from '../typeorm/entities/Product';
import AppError from 'src/shared/errors/ApiError';

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
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.update(id, product);

    return product;
  }
}
