


import { createParamDecorator, ExecutionContext, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { verifyUser,TokenExpiredError } from '../utils/verifyUser';

export const BearerCheck = createParamDecorator(
  async (data:unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = (request.headers['authorization'].split(' ')[1]).replace(';','');
    try {
     let result = await verifyUser(token);
     return result;
    } catch(err){
      if(err instanceof TokenExpiredError){
         throw new HttpException('Время токена истекло',HttpStatus.UNAUTHORIZED); 
      }
    }
  }
);