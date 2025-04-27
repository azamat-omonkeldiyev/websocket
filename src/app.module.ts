import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { GroupModule } from './group/group.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [UserModule, ChatModule, PrismaModule, GroupModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
