import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    let request: Request = context.switchToHttp().getRequest();
    let token = request.headers.authorization?.split(' ')?.[1];

    if(!token){
      throw new UnauthorizedException('token not provided')
    }
    try {
      let data = this.jwt.verify(token);
      request['user-id'] = data.id;
      return true
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials!')
    }
  }
}
