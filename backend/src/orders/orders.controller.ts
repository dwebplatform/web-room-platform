import { Controller,Body,Post, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { UpdateOrderStatusDto } from './dto/updateorderstatus.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  
  constructor(private readonly ordersService: OrdersService) {}
  
  @Get('/:id')
  async showOne(@Param('id') id:string){
    try{
      return await this.ordersService.findOne(id);
    } catch(e){
      throw new HttpException('Не удалось получить заказ по данному id',HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/change-status')
  changeStatus(@Body() updateOrderStatusDto:UpdateOrderStatusDto){
    try{
      return this.ordersService.updateStatus(updateOrderStatusDto);
    } catch(e){
      throw new HttpException('Не удалось обновить статус',HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/')
  async show(){
    try {
      return await this.ordersService.findAll();
    } catch(e){
      throw new HttpException('Не удалось получить список пользователей',HttpStatus.BAD_REQUEST);
    }
  }
}
