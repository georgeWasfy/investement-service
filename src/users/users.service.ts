import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUser } from './types';
import { TransactionResource } from '@base/transaction/resources/transaction.resource';
import { TransactionType } from '@base/transaction/types';
import { Transaction } from '@base/transaction/model/transaction.model';

@Injectable()
export class UsersService {
  async create(userData: CreateUser): Promise<{ data: { user: User } }> {
    try {
      const user = await User.create(userData);
      return {
        data: { user },
      };
    } catch (error) {
      throw new BadRequestException('Cant Create a User');
    }
  }

  async getUserTransactions(userId: number) {
    try {
      const trs = await Transaction.findAll({ where: { userId } });
      return {
        data: { transactions: new TransactionResource().toDTOs(trs) },
      };
    } catch (error) {
      throw new BadRequestException('Cant get User transactions');
    }
  }
}
