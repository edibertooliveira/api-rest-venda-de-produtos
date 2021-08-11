import { Request, Response } from 'express';
import {
  CreateCustomerService,
  DeleteCustomerService,
  ListCustomersService,
  ShowCustomerService,
  UpdateCustomerService,
} from '../services';

export default class CustomersController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();
    const customers = await listCustomers.execute();
    return res.status(200).json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findCustomer = new ShowCustomerService();
    const customer = await findCustomer.execute({ id });
    return res.status(200).json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({ name, email });
    return res.status(201).json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });
    return res.status(206).json({});
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({ id, name, email });
    return res.status(200).json(customer);
  }
}
