import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
