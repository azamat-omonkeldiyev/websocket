import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { connect } from 'http2';
import { CreateGroupMessagetDto } from './dto/group-message.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma:PrismaService){}
  async createGr(data: CreateGroupDto) {
   try {
    let newGr = await this.prisma.group.create({data})
    return newGr
   } catch (error) {
    throw new BadRequestException(error.message)
   }
  }

  async JoinGr(data: {groupId:string,userId:string}){
    try {
      let joined = await this.prisma.user.update({
        where: {id: data?.userId},
        data: {
          groups: {connect: [{id: data?.groupId}]}
        }
      })
      return joined;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAllGr(MyId: string) {
    try {
      let groups = await this.prisma.group.findMany({
        where: {
          users: {
            some: {id: MyId}
          }
        }
      })
      return groups
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async messageCreate(data:CreateGroupMessagetDto){
    try {
      let message = await this.prisma.groupMessage.create({
        data
      })
      return message;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getMessage(groupId: string){
    try {
      let messages = await this.prisma.groupMessage.findMany({
        where: {
          groupId
        }
      })
      return messages
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
