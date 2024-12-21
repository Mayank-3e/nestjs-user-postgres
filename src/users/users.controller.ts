import { Controller, Get, Put, Post, Body, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: { name?: string; email?: string, phone?: string },
  ) {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}