import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AuthMiddleware } from 'src/auth/middlewares/AuthMiddleware';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule implements NestModule  {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'orders', method: RequestMethod.GET}
        );
  }
}
