import { Test, TestingModule } from '@nestjs/testing';
import { UserAvatarController } from './user-avatar.controller';
import { UserAvatarService } from './user-avatar.service';

describe('UserAvatarController', () => {
  let controller: UserAvatarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAvatarController],
      providers: [UserAvatarService],
    }).compile();

    controller = module.get<UserAvatarController>(UserAvatarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
