import { Test, TestingModule } from '@nestjs/testing';
import { TestworkController } from './testwork.controller';

describe('TestworkController', () => {
  let controller: TestworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestworkController],
    }).compile();

    controller = module.get<TestworkController>(TestworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
