import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '@modules/orders/typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/custormers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}

interface ICreateOrder {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({
    customer_id,
    products,
  }: ICreateOrder): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists)
      throw new AppError('Could not find any customer with the given id');

    const existsProducts = await productsRepository.findAllByIds(products);
    if (!existsProducts.length)
      throw new AppError('Could not find any products with the given ids');

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length)
      throw new AppError(`Could not find products: ${checkInexistentProducts}`);

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (checkInexistentProducts.length)
      throw new AppError(
        `The quantity: ${checkInexistentProducts[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
