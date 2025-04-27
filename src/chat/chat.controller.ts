import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { REQUEST } from '@nestjs/core';
import { request } from 'http';
import { CreateMessagetDto } from './dto/create-message.chat';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    let id = request['user-id']
    // console.log(id)
    return this.chatService.getChat(id);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param('id') id:string){
    return this.chatService.deleteChat(id)
  }

  @Post('message')
  createMessage(@Body() data: CreateMessagetDto){
    return this.chatService.createMessage(data)
  }

  @Get('message/:chatid')
  getAllMessage(@Param('chatid') chatid:string){
    return this.chatService.getMessages(chatid)
  }
}
