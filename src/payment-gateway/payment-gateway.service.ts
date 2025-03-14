import { Status } from '@base/transaction/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentGatewayService {
  async processPayment(paymentId: number): Promise<void> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async checkPaymentStatus(paymentId: number): Promise<Status> {
    // Simulate one success every two failures
    const successEveryTwoFailures = Math.random() < 1 / 3;

    if (successEveryTwoFailures) {
      return 'success';
    } else {
      return 'failed';
    }
  }
}
