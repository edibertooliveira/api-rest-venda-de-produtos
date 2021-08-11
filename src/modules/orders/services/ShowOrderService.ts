import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/ApiError';
import Order from '@modules/orders/typeorm/entities/Order';
import { OrdersRepository } from '@modules/orders/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}
export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
