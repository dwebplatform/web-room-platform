import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { Book } from './models/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ){}
  
  async getBooks():Promise<Book[]>{
    return await this.bookRepository.find();
  }
  async all(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['books']
    });
  }
}
