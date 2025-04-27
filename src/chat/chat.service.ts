import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessagetDto } from './dto/create-message.chat';

@Injectable()
export class ChatService {
 constructor(private readonly prisma: PrismaService){}

 async createChat(data: CreateChatDto){
  try {
    let chat = await this.prisma.chat.create({data});
    return chat;
  } catch (error) {
    throw new BadRequestException(error.message)
  }
 }

 async getChat(myId: string){
  try {
    let chat = await this.prisma.chat.findMany({
      where: {
        OR: [
          {fromId: myId},
          {toId:myId}
        ],
      },
      include: {
        from: true,
        to: true
      }
    })
    return chat
  } catch (error) {
    throw new BadRequestException(error.message)
  }
 }

 async deleteChat(id: string){
  try {
    let chat = await this.prisma.chat.delete({where: {id}});
    return chat
  } catch (error) {
    throw new BadRequestException(error.message)
  }
 }

 async createMessage(@Body() data: CreateMessagetDto){
  let newMessage = await this.prisma.message.create({data})
  return newMessage;

}
async getMessages(chatId:string){
  let messages = this.prisma.message.findMany({
    where: {chatId} });
  return messages
}
}
