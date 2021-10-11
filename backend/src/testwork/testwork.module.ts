import { Module } from '@nestjs/common';
import { TestworkService } from './testwork.service';
import { TestworkController } from './testwork.controller';

@Module({
  providers: [TestworkService],
  controllers: [TestworkController]
})
export class TestworkModule {}
