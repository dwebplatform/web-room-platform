import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ApartmentsModule } from './apartments/apartments.module';

import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { CharsModule } from './chars/chars.module';


@Module({
  imports: [
  
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'apartment_db',
        },
      },
    }),
    ProductsModule,
    OrdersModule,
    ApartmentsModule,
    CharsModule,    
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
