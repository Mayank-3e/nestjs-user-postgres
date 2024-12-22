import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    updateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt')) // Mock the AuthGuard
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should update a user successfully when id matches req.user.id', async () => {
    const req = { user: { sub: 1 } };
    const id = 1;
    const updateData: UpdateUserDto = { name: 'Jane Doe' };

    const updatedUser = { id: 1, name: 'Jane Doe' };
    mockService.updateUser.mockResolvedValue(updatedUser);

    const result = await controller.updateUser(req, id, updateData);

    expect(mockService.updateUser).toHaveBeenCalledWith(id, { name: updateData.name} );
    expect(result).toEqual(updatedUser);
  });

  it('should throw NotFoundException if user is not found', async () => {
    const req = { user: { sub: 1 } };
    const id = 1;
    const updateData: UpdateUserDto = { name: 'Jane Doe' };

    mockService.updateUser.mockRejectedValue(new NotFoundException());

    await expect(controller.updateUser(req, id, updateData)).rejects.toThrow(NotFoundException);
  });
});
