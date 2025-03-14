import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class PaymentGatewayClient {
  private readonly paymentGatewayUrl = 'http://localhost:3000/api/payments'; 

  async createPayment(): Promise<number> {
    try {
      const response = await axios.post(`${this.paymentGatewayUrl}`);
      return response.data.id;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Failed to create payment: ${error.message}`);
      }
      throw error;
    }
  }

  async checkPaymentStatus(id: number): Promise<string> {
    try {
      const response = await axios.get(`${this.paymentGatewayUrl}/${id}`);
      return response.data.status;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Failed to check payment status: ${error.message}`);
      }
      throw error;
    }
  }
}
