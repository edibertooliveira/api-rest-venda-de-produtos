import { Request, Response } from 'express';
import { ShowOrderService, CreateOrderService } from '@modules/orders/services';

export default class OrdersController {
  // public async index(_req: Request, res: Response): Promise<Response> {
  //   const listOrders = new ListOrdersService();
  //   const orders = await listOrders.execute();
  //   return res.status(200).json(orders);
  // }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findOrder = new ShowOrderService();
    const order = await findOrder.execute({ id });
    return res.status(200).json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;
    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({ customer_id, products });
    return res.status(201).json(order);
  }

  // public async delete(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const deleteOrder = new DeleteOrderService();
  //   await deleteOrder.execute({ id });
  //   return res.status(206).json({});
  // }
  //
  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const { name, price, quantity } = req.body;
  //   const updateOrder = new UpdateOrderService();
  //   const order = await updateOrder.execute({ id, name, price, quantity });
  //   return res.status(200).json(order);
  // }
}
