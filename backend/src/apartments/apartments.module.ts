import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/middlewares/AuthMiddleware';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService]
})
export class ApartmentsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'apartments/get-protected-data', method: RequestMethod.POST},
        {path: 'apartments/show/all', method: RequestMethod.GET}
        );
  }
}

