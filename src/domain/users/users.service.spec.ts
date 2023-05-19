import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userMockRepository } from './__mocks__/userMockRepository';
import { userEntityMockList } from './__mocks__/userMockEntity';
import { createUserMockDto } from './__mocks__/createUserMock.dto';
import { validate } from 'uuid';

describe('Users Service Unit test', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userMockRepository],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Create', () => {
    test('Method create', async () => {
      const data = createUserMockDto;
      const result = await userService.create(data);
      expect(result).toStrictEqual(userEntityMockList[0]);
      expect(validate(result.id)).toBeTruthy();
      expect(result.name).toBe('username2');
    });
  });

  describe('List', () => {
    test('Method findAll', async () => {
      const result = await userService.findAll();
      expect(result).toStrictEqual(userEntityMockList);
      expect(result.length).toEqual(3);
    });
  });

  describe('FindOne', () => {
    test('Method findOne', async () => {
      const result = await userService.findOne(userEntityMockList[2].id);
      expect(result).toStrictEqual(userEntityMockList[2]);
    });
  });
});
