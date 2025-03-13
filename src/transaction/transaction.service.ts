import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transaction } from './model/transaction.model';

@Injectable()
export class TransactionService {
  async create(transactionDTO: CreateTransactionDTO) {
    try {
      const tr = await Transaction.create(transactionDTO as any);

      return { data: { tr } };
    } catch (error) {
      console.log("🚀 ~ TransactionService ~ create ~ error:", error)
      throw new BadRequestException('Unable to create transaction');
    }
  }
}
