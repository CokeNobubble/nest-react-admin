import { Test, TestingModule } from '@nestjs/testing';
import { DeptMagService } from './dept-mag.service';

describe('DeptMagService', () => {
  let service: DeptMagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeptMagService],
    }).compile();

    service = module.get<DeptMagService>(DeptMagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
