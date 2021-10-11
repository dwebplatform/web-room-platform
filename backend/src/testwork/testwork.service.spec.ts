import { Test, TestingModule } from '@nestjs/testing';
import { TestworkService } from './testwork.service';

describe('TestworkService', () => {
  let service: TestworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestworkService],
    }).compile();

    service = module.get<TestworkService>(TestworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
