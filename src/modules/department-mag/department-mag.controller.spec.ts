import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentMagController } from './department-mag.controller';
import { DepartmentMagService } from './department-mag.service';

describe('DepartmentMagController', () => {
  let controller: DepartmentMagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentMagController],
      providers: [DepartmentMagService],
    }).compile();

    controller = module.get<DepartmentMagController>(DepartmentMagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
