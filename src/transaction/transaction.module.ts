import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PaymentModule } from '@base/payment/payment.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PaymentModule],
})
export class TransactionModule {}
