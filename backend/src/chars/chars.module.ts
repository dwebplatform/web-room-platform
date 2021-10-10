import { Module } from '@nestjs/common';
import { CharsService } from './chars.service';
import { CharsController } from './chars.controller';

@Module({
  providers: [CharsService],
  controllers: [CharsController]
})
export class CharsModule {}
