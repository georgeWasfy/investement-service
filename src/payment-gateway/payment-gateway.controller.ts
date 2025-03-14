import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@base/auth/decorator/public.decorator';

@Controller('payments')
@ApiTags('Mock Payment Gateway')
export class PaymentGatewayController {
  private paymentIdCounter = 0;
  private failureCount = 0;

  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post()
  @Public()
  async createPayment(
    @Body() paymentData: any,
  ): Promise<{ id: number; status: string }> {
    this.paymentIdCounter++;
    const paymentId = this.paymentIdCounter;

    // Simulate payment processing
    await this.paymentGatewayService.processPayment(paymentId);

    return { id: paymentId, status: 'pending' };
  }

  @Get(':id')
  @Public()
  async getPaymentStatus(@Param('id') id: number): Promise<{ status: string }> {
    // Simulate payment status check
    const status = await this.paymentGatewayService.checkPaymentStatus(id);

    if (status === 'failed') {
      this.failureCount++;
    } else if (status === 'success') {
      this.failureCount = 0; // Reset failure count on success
    }

    return { status };
  }
}
