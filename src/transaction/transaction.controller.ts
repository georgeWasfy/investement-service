import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller({ version: '1', path: 'transactions' })
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() transactionDTO: CreateTransactionDTO) {
    return await this.transactionService.create(transactionDTO);
    
  }
}
