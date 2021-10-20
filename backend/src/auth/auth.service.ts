import { Body, Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from './tokenUtils/hashFunc';
const knexPopulate = require('knex-populate');

@Injectable()
export class AuthService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async tokensForUser(email: string,refreshToken:string ){
    const [user] = await this.knex('users').select('id').where({email});
    const allTokens = await this.knex('user_tokens').select('value').where({user_id:user.id});
    console.log(allTokens);
    let isTokenBelongToUser = false;
     for(let tokenObj of allTokens){
      if(tokenObj.value === refreshToken){
        isTokenBelongToUser = true;
        break;
      }
    }
    //TODO: check refresh token from cookies instead of incoming
    if(!isTokenBelongToUser){
      // пользователь  с таким токеном не зарегистрирован:
      throw new HttpException('не зарегистрированный пользователь реф', HttpStatus.UNAUTHORIZED);
    }
    return allTokens;
  }
  async signin( user: CreateUserDto ){
    
    // before insert check if user with this email exist

    const [ id ] = await this.knex('users').insert({
      email:user.email,
      password: await hash(user.password) // hashed password,
    });
    if(!id){
      throw new HttpException('Не удалось авторизоваться', HttpStatus.BAD_REQUEST);
    }
    return id;
  }

}


/**
 * 
 * 


@Injectable()
export class OrdersService {
  async findOne(id: string) {
    const [order] = await knexPopulate(this.knex, 'orders')
      .find({ id })
      .populate('comments', 'order_id', 'comments').exec();
    return orderToDto(order);
  }
 */