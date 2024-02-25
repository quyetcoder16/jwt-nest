import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const data = await this.usersService.create(createUserDto);
    res.status(data.status).send(data);
  }

  @Get()
  async getAllUser(@Res() res) {
    const data = await this.usersService.getAllUserService();
    res.status(data.status).send(data);
  }

  @Get(':id')
  async getDetailUser(@Param('id') id: string, @Res() res) {
    const data = await this.usersService.getDetailByIdService(+id);
    res.status(data.status).send(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    const data = await this.usersService.update(+id, updateUserDto);
    res.status(data.status).send(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const data = await this.usersService.deleteUserByIdService(+id);
    res.status(data.status).send(data);
  }
}
