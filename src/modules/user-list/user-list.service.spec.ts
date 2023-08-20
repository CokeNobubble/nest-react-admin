import { Test, TestingModule } from '@nestjs/testing';
import { UserListService } from './user-list.service';

describe('UserListService', () => {
  let service: UserListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserListService],
    }).compile();

    service = module.get<UserListService>(UserListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
