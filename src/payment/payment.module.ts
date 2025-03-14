import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentGatewayClient } from './payment-gateway.client';

@Module({
  providers: [PaymentService, PaymentGatewayClient],
  exports: [PaymentService, PaymentGatewayClient],
})
export class PaymentModule {}
