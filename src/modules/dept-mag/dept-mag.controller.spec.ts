import { Test, TestingModule } from '@nestjs/testing';
import { DeptMagController } from './dept-mag.controller';
import { DeptMagService } from './dept-mag.service';

describe('DeptMagController', () => {
  let controller: DeptMagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeptMagController],
      providers: [DeptMagService],
    }).compile();

    controller = module.get<DeptMagController>(DeptMagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
