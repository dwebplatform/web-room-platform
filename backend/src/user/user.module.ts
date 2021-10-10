import { Module,Get } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { Book } from './models/book.entity';

@Module({
  imports :[TypeOrmModule.forFeature([User, Book])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
  @Get()
  all(){
    return ['users'];
  }
}
