import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { charToDto } from './dto/char.dto';
import { CreateCharDto } from './dto/create-char.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CharsService {

  constructor(@InjectConnection() private readonly knex: Knex) {}

  
  async findAll(charKeyName: string){

    const queryBuilder = this.knex('characteristics');
    let chars = [];
    if(charKeyName){
      chars =  await queryBuilder.where('key_name','like',`%${charKeyName}%`);
    } 
    chars = await queryBuilder;
    return chars.map(charToDto);
  }
  async create(createCharDto:CreateCharDto){
    
    return this.knex('characteristics').insert({
      key_name: createCharDto.keyName,
      type: createCharDto.type,
      [createCharDto.charVariant]: createCharDto.char
    });
  }
}

