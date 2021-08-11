import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '@modules/custormers/typeorm/repositories/CustomersRepository';
import Customer from '@modules/custormers/typeorm/entities/Customer';
import AppError from '@shared/errors/ApiError';

interface IShowCustomer {
  id: string;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) throw new AppError('Customer not found');

    return customer;
  }
}
