import { Test, TestingModule } from '@nestjs/testing';
import { UserListController } from './user-list.controller';
import { UserListService } from './user-list.service';

describe('UserListController', () => {
  let controller: UserListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserListController],
      providers: [UserListService],
    }).compile();

    controller = module.get<UserListController>(UserListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
