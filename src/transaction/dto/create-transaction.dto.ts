import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsJSON, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @ApiProperty({
    example: 'USD',
    description: 'The currency of the transaction (e.g., USD, EUR)',
  })
  currency: string;

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
