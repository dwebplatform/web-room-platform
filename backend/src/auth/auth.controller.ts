import { Body, Controller, Post, HttpException,Headers, HttpStatus, Header, Res } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { generateToken } from './tokenUtils/generateToken';

@Controller('auth')
export class AuthController {

  constructor( private  readonly authService: AuthService,@InjectConnection() private readonly knex: Knex ){}



  // get accessToken by refreshToken
  @Post('/refresh')
  async refresh(@Body() tokenData: {refreshToken: string, email: string}){
    const [user] = await this.knex('users').select('id','email').where({email:tokenData.email});
    if( !user) {
      throw new HttpException('не зарегистрированный пользователь', HttpStatus.BAD_REQUEST);
    }
    const availableTokens = await this.authService.tokensForUser(tokenData.email, tokenData.refreshToken);
    // create new Token,  
    const token  = await generateToken(user.id, user.email,1*30);
    const refreshToken = await generateToken(user.id,user.email, 24*60*60);
    
     // insert refreshToken to database
     const [refreshTokenId] = await this.knex('user_tokens').insert({
      value:refreshToken,
      user_id: user.id
    });
    return {
      accessToken: token,
      refreshToken,
      expiresAt: Math.floor(Date.now()/1000) + 1*30
    };
  }
  @Post('/signin')
  async signin(@Body() createUser: CreateUserDto){
    // userService
    const id = await  this.authService.signin(createUser);
    const token  = await generateToken(id, createUser.email,1*30);
    const refreshToken = await generateToken(id, randomBytes(12).toString('hex'), 24*60*60);
    // insert refreshToken to database
    const [refreshTokenId] = await this.knex('user_tokens').insert({
      value:refreshToken,
      user_id: id
    });

    return {
      accessToken: token,
      refreshToken,
      email: createUser.email,
      expiresAt: Math.floor(Date.now()/1000) + 1*30
    }; 
 
  }
}
