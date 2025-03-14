import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transaction } from './model/transaction.model';
import Decimal from 'decimal.js';
import { Currency } from './types';
import { PaymentService } from '@base/payment/payment.service';

@Injectable()
export class TransactionService {
  constructor(private readonly paymentService: PaymentService) {}
  conversionRates = {
    USD: {
      EUR: 0.88,
      GBP: 0.76,
    },
    EUR: {
      USD: 1.14,
      GBP: 0.86,
    },
    GBP: {
      USD: 1.32,
      EUR: 1.16,
    },
  };

  async create(transactionDTO: CreateTransactionDTO) {
    try {
      const converted_amount = this.convertCurrency(
        transactionDTO.amount,
        transactionDTO.currency,
      );
      const status = await this.paymentService.processPayment();
      const meta = {
        originalAmount: transactionDTO.amount,
        originalCurrency: transactionDTO.currency,
        exchangeRateDate: new Date(),
      };
      transactionDTO = {
        ...transactionDTO,
        amount: converted_amount,
        currency: 'USD',
        metadata: {...transactionDTO.metadata, ...meta},
        status
      };
      const tr = await Transaction.create(transactionDTO as any);

      return { data: { transaction: tr } };
    } catch (error) {
      throw new BadRequestException('Unable to create transaction');
    }
  }

  convertCurrency(
    amount: number,
    fromCurrency: Currency,
    toCurrency: Currency = 'USD',
  ): number {
    if (
      !this.conversionRates[fromCurrency] ||
      !this.conversionRates[fromCurrency][toCurrency]
    ) {
      throw new Error(
        `Conversion rate not available for ${fromCurrency} to ${toCurrency}`,
      );
    }

    const conversionRate = this.conversionRates[fromCurrency][toCurrency];
    const decimalAmount = new Decimal(amount.toString());
    const decimalConversionRate = new Decimal(conversionRate.toString());

    const result = decimalAmount.mul(decimalConversionRate);
    return result.toNumber();
  }
}
