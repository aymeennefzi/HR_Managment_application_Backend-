import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { User } from 'src/schemas/user.schemas';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
      }

      @Get()
      async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
      }

      @Put(':id')
      async updateUser(@Param('id') userId: string, @Body() updateUserDto: any): Promise<User> {
        return this.userService.updateUser(userId, updateUserDto);
      }

      @Delete(':id')
      async deleteUser(@Param('id') userId: string): Promise<User> {
        return this.userService.deleteUser(userId);
      }
}
