import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentMagService } from './department-mag.service';

describe('DepartmentMagService', () => {
  let service: DepartmentMagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentMagService],
    }).compile();

    service = module.get<DepartmentMagService>(DepartmentMagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
