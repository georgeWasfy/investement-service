import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { Currency, CurrencyEnum } from '../types';

export class CreateTransactionDTO {
  @IsNumber()
  @ApiProperty({
    example: 100.5,
    description: 'The amount of the transaction',
  })
  amount: number;

  @IsEnum(CurrencyEnum)
  @ApiProperty({
    example: 'USD',
    description: 'The currency of the transaction (e.g., USD, EUR)',
  })
  currency: Currency;
}
