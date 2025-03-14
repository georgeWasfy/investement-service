import { Injectable } from '@nestjs/common';
import { PaymentGatewayClient } from './payment-gateway.client';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class PaymentService {
  private readonly maxAttempts = 3;
  private readonly initialDelay = 1000; // 1000 ms = 1 sec
  private readonly backoffFactor = 2;

  constructor(
    private readonly paymentGatewayClient: PaymentGatewayClient,
    private readonly logger: PinoLogger,
  ) {}

  async processPayment(): Promise<string> {
    const paymentId = await this.paymentGatewayClient.createPayment();

    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const status =
        await this.paymentGatewayClient.checkPaymentStatus(paymentId);

      if (status === 'success') {
        this.logger.info({ paymentId }, 'Succesfull Payment Request');

        return status;
      } else if (status === 'failed') {
        this.logger.error({ paymentId }, 'Failed Payment Request');
        if (attempt < this.maxAttempts - 1) {
          await this.delay(this.getDelay(attempt));
        } else {
          return status;
        }
      }
    }

    throw new Error('Payment processing failed after retries');
  }

  private getDelay(attempt: number): number {
    return this.initialDelay * Math.pow(this.backoffFactor, attempt);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
