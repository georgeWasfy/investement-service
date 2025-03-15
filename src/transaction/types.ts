export type Currency = 'USD' | 'EUR' | 'GBP'
export type Status = 'success' | 'failed'


export enum CurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
}
  
export type TransactionType = {
  id: number;
  amount: number;
  userId: number;
  currency: Currency;
  status: Status;
  metadata: object;
  ROI: number;
  createdAt: Date;
  updatedAt: Date;
};