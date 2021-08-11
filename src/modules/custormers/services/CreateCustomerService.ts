import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '@modules/custormers/typeorm/repositories/CustomersRepository';
import Customer from '@modules/custormers/typeorm/entities/Customer';
import AppError from '@shared/errors/ApiError';

interface ICreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customerExists = await customersRepository.findByEmail(email);
    if (customerExists) {
      throw new AppError('There is already one customer with this email', 400);
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);
    return customer;
  }
}
