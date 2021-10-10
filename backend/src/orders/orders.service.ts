import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { orderToDto } from './dto/order.dto';
import { UpdateOrderStatusDto } from './dto/updateorderstatus.dto';
const knexPopulate = require('knex-populate');


@Injectable()
export class OrdersService {
  constructor(@InjectConnection() private readonly knex: Knex) { }
  async findOne(id: string) {
    const [order] = await knexPopulate(this.knex, 'orders')
      .find({ id })
      .populate('comments', 'order_id', 'comments').exec();
    return orderToDto(order);
  }

  async findAll() {
    const orders = await this.knex.table('orders');
    return orders.map(orderToDto);
  }

  async updateStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const findedOrderId = await this.knex.table('orders').update({status:updateOrderStatusDto.newStatus}).where({id: updateOrderStatusDto.id});
    const order = await this.knex.table('orders').where({id: findedOrderId}).first();
    return orderToDto(order);
  }
}
