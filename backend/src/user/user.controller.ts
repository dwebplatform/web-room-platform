import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import { Book } from './models/book.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  @Get('/')
 async all():Promise<Book[]>{
    return await this.userService.getBooks();
  }
  
}
