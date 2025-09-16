import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { CreateOrderRequest } from './dto/create-order.request';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async createOrder(request: CreateOrderRequest) {
    return this.orderRepository.create(request);
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
