import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsJSON, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Currency, CurrencyEnum } from '../types';

export class CreateTransactionDTO {
  @IsNumber()
  @ApiProperty({
    example: 100.5,
    description: 'The amount of the transaction',
  })
  amount: number;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with the transaction',
  })
  userId: number;

  @IsEnum(CurrencyEnum)
  @ApiProperty({
    example: 'USD',
    description: 'The currency of the transaction (e.g., USD, EUR)',
  })
  currency: Currency;

  @IsString()
  @ApiProperty({
    example: 'pending',
    description: 'The status of the transaction (e.g., pending, completed)',
  })
  status: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    example: { key: 'value' },
    description: 'Optional metadata for the transaction',
  })
  metadata: object;
}
