export type Currency = 'USD' | 'EUR' | 'GBP'
export type Status = 'success' | 'failed'


export enum CurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
}
  
export type Transaction = {
  id: number;
  amount: number;
  userId: number;
  currency: Currency;
  status: Status;
  metadata: object;
}