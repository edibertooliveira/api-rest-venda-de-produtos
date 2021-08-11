import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '@modules/custormers/typeorm/repositories/CustomersRepository';
import Customer from '@modules/custormers/typeorm/entities/Customer';

export default class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);
    return await customersRepository.find();
  }
}
