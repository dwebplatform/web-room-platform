import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, verifyUser } from 'src/apartments/utils/verifyUser';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';


const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(@InjectConnection() private readonly knex: Knex) {}
	
  //TODO: глобальное изменение добавить refreshToken в куки, сессию а не так, чтобы он туда сюда летал(
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1].replace(';','');
      if(token === 'undefined'){
        throw new HttpException('Время токена истекло', HttpStatus.UNAUTHORIZED);
      }
      try{
        let result = await verifyUser(token);

        const [user] = await this.knex('users').select('id','email').where({id: result.id});
        if(!user){
          throw new HttpException('Не зарегистрированный пользователь', HttpStatus.UNAUTHORIZED);
        }
        if(result.id){
           //@ts-ignore
          req.userId = result.id;
        }
        //@ts-ignore
      } catch(err){

        if((err instanceof TokenExpiredError)||(err instanceof jwt.JsonWebTokenError)){
          throw new HttpException('Время токена истекло', HttpStatus.UNAUTHORIZED);
        } else {
          next(err);
        }
      }
      next();
    } else {
      throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
    }
  }
}