import { EntityRepository, Repository } from 'typeorm';
import Order from '@modules/orders/typeorm/entities/Order';
import Customer from '@modules/custormers/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IOrder {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    return await this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
  }

  public async createOrder({ customer, products }: IOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
