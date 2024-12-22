import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should update a user successfully', async () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' } as User;
    mockRepository.findOneBy.mockResolvedValue(user);
    mockRepository.save.mockResolvedValue({ ...user, name: 'Jane Doe' });

    const result = await service.updateUser(1, { name: 'Jane Doe' });
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...user,
      name: 'Jane Doe',
    });
    expect(result.name).toBe('Jane Doe');
  });

  it('should throw NotFoundException if user is not found', async () => {
    mockRepository.findOneBy.mockResolvedValue(null);

    await expect(service.updateUser(1, { name: 'Jane Doe' })).rejects.toThrow(
      NotFoundException
    );
  });
});
