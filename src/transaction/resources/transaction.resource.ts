import Decimal from 'decimal.js';
import { Transaction } from '../model/transaction.model';
import { TransactionType } from '../types';
import { ModelMapper } from '@base/utils/resource.mapper';

function calculateROI(initialInvestment: number): number {
  // Calculate currentValue as 10% more than initialInvestment
  const initialInvestmentDecimal = new Decimal(initialInvestment.toString());
  const currentValue = initialInvestmentDecimal.add('200');

  // Calculate ROI using the provided formula
  const roi = currentValue
    .sub(initialInvestmentDecimal)
    .div(initialInvestmentDecimal)
    .mul(new Decimal('100'));

  return roi.toNumber();
}

function mapTransactionToDTO(model: Transaction): TransactionType {
  return {
    id: model.id,
    amount: model.amount,
    userId: model.userId,
    currency: model.currency,
    ROI: calculateROI(model.amount),
    status: model.status,
    metadata: model.metadata,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
}

export class TransactionResource extends ModelMapper<
  Transaction,
  TransactionType
> {
  constructor() {
    super(mapTransactionToDTO);
  }

  toDTO(transaction: Transaction): TransactionType {
    this.setModel(transaction);
    return this.mapModelToType();
  }

  toDTOs(transactions: Transaction[]): TransactionType[] {
    const mapper = new ModelMapper<Transaction, TransactionType>(
      mapTransactionToDTO,
    );
    mapper.setModels(transactions);
    return mapper.mapModelsToTypes();
  }
}
