import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGroupMessagetDto } from './dto/group-message.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGr(createGroupDto);
  }

  @Post('join')
  joinGr(@Body() data: any){
    return this.groupService.JoinGr(data)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    let id = request['user-id']
    console.log(id)
    return this.groupService.findAllGr(id);
  }

  @Post('message')
  message(@Body() data:CreateGroupMessagetDto){
    return this.groupService.messageCreate(data)
  }

  @Get('message/:groupId')
  getMessage(@Param('groupId') groupId:string){
    return this.groupService.getMessage(groupId);
  }
}
