import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { CreateOrderRequest } from './dto/create-order.request';
import { BILLING_SERVICE } from './constants/service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from "rxjs";

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const sesssion = await this.orderRepository.startTransaction();
    try {

      const order = await this.orderRepository.create(request, { session: sesssion })
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request
        })
      );
      await sesssion.commitTransaction();
      return order;
    } catch (err) {
      await sesssion.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
