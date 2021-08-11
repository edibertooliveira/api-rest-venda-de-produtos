import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '@modules/custormers/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/ApiError';

interface IDeleteCustomer {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) throw new AppError('Customer not found');
    await customersRepository.delete(id);
  }
}
