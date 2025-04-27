import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ JwtModule.register({
    global: true,
    secret: "secret",
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
