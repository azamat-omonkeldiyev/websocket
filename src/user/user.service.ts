import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ){}

  async UserPhone(phone: string){
    try {
      let user = await this.prisma.user.findFirst({where:{phone}});
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async UserName(userName: string){
    try {
      let user = await this.prisma.user.findFirst({where:{userName}});
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async create(data: CreateUserDto) {
    try {
      let PoNu = await this.UserPhone(data.phone);
      if(PoNu){
        throw new BadRequestException("This phone number already exists!")
      };

      let userN = await this.UserName(data.userName);
      if(userN){
        throw new BadRequestException("This username already exists!")
      };

      let newUser = await this.prisma.user.create({data})
      return newUser
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async login(data: UpdateUserDto){
    try {
      if(data.phone && data.userName){
        let user = await this.UserPhone(data.phone)
        let userName = await this.UserName(data.userName)
        if(!user || !userName){
          throw new NotFoundException("user not exists!")
        }
        let token = this.jwt.sign({ id: user.id });
        return {token}
      }else{
        throw new NotFoundException("user phone and username mast be required")
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    try {
      let users = await this.prisma.user.findMany()
      return users 
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.prisma.user.findFirst({where:{id}});
      if(!user){
        throw new NotFoundException("User not found")
      }
      return user 
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      let user = await this.prisma.user.update({where:{id},data});
      if(!user){
        throw new NotFoundException("User not found")
      }
      return user 
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string) {
    try {
      let user = await this.prisma.user.delete({where:{id}});
      if(!user){
        throw new NotFoundException("User not found")
      }
      return user 
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
