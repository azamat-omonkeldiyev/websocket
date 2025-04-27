import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGlobalDto } from './dto/create-global.dto';
import { UpdateGlobalDto } from './dto/update-global.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GlobalService {
  constructor(private readonly prisma: PrismaService){}
  async create(data: CreateGlobalDto) {
    try {
      let newtext = await this.prisma.globalMessage.create({data})
      return newtext
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    try {
      let messages = await this.prisma.globalMessage.findMany()
      return messages
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
