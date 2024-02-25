import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  prisma = new PrismaClient();

  isValidPassword = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }

  generateHashPassword = async (password: string): Promise<string> => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const checkEmailExist = await this.getUserDetailByEmailService(createUserDto.email);
      console.log(checkEmailExist);
      if (checkEmailExist.status == 200) {
        return {
          status: 400,
          message: "email exits"
        }
      }

      const hashPassword = await this.generateHashPassword(createUserDto.password);

      const newUser = { ...createUserDto, password: hashPassword };

      await this.prisma.users.create({
        data: newUser
      });

      return {
        status: 201,
        message: "created successful"
      }

    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }

  async getAllUserService(): Promise<any> {
    try {
      const dataUser = await this.prisma.users.findMany();
      if (!dataUser) {
        return {
          status: 404,
          message: "not found"
        }
      }
      return {
        status: 200,
        data: dataUser
      }
    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }

  async getUserDetailByEmailService(email: string): Promise<any> {
    try {
      const userDetail = await this.prisma.users.findFirst({
        where: {
          email
        }
      });
      if (!userDetail) {
        return {
          status: 404,
          message: "not found"
        }
      }
      return {
        status: 200,
        data: userDetail
      }
    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }

  async getDetailByIdService(id: number): Promise<any> {
    try {
      const userDetail = await this.prisma.users.findFirst({
        where: {
          user_id: id
        }
      });
      if (!userDetail) {
        return {
          status: 404,
          message: "not found"
        }
      }
      return {
        status: 200,
        data: userDetail
      }
    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }

  async findOne(email: string): Promise<any> {
    const data = await this.prisma.users.findFirst({
      where: {
        email
      }
    });
    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const checkExist = await this.getDetailByIdService(id);
      if (checkExist.status != 200) {
        return {
          status: 404,
          message: "not found!"
        }
      }

      await this.prisma.users.update({
        where: {
          user_id: id
        },
        data: updateUserDto
      })

      return {
        status: 200,
        message: "update user successful"
      }

    } catch (error) {
      return {
        status: 500,
        error
      }
    }
  }


  async deleteUserByIdService(id: number): Promise<any> {
    try {
      const checkExist = await this.getDetailByIdService(id);
      if (checkExist.status != 200) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "user is not exist!"
        }
      }

      await this.prisma.users.delete({
        where: {
          user_id: id
        }
      })

      return {
        status: HttpStatus.OK,
        message: "delete user successful!"
      }

    } catch (error) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        error
      }
    }
  }

}
