import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '@modules/custormers/typeorm/repositories/CustomersRepository';
import Customer from '@modules/custormers/typeorm/entities/Customer';
import AppError from '@shared/errors/ApiError';

interface IUpdateCustomer {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) throw new AppError('Customer not found');

    const userUpdateEmail = await customersRepository.findByEmail(email);

    if (!customer.email.includes(email) && userUpdateEmail)
      throw new AppError('There is already one customer with this email.');

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
