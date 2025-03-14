import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  min,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { Currency, CurrencyEnum } from '../types';

@ValidatorConstraint({ name: 'isGreaterThanZero' })
export class IsGreaterThanZeroConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'number' && value > 0;
  }

  defaultMessage(validationArguments: ValidationArguments) {
    return 'Investement must be greater than zero';
  }
}

export class CreateTransactionDTO {
  @IsNumber()
  @Validate(IsGreaterThanZeroConstraint)
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
