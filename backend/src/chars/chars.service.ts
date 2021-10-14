import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    
    const [charId] = await this.knex('characteristics').insert({
      key_name: createCharDto.keyName,
      type: createCharDto.type,
      [createCharDto.charVariant]: createCharDto.char
    });
    if(!charId){
      throw new HttpException('Не удалось создать новую характеристику',HttpStatus.BAD_REQUEST);
    }

    return  charToDto(await this.knex('characteristics').where({id:charId}).first());
  }
  async addApartment(charId: number, apartmentId: number){
    const [charApartmentId] = await  this.knex('apartments_characteristics').insert({
      apartment_id: apartmentId,
      characteristic_id: charId
    });
    if(!charApartmentId){
      throw new HttpException('Не удалось добавить квартиру к данной характеристике', HttpStatus.BAD_REQUEST);
    }
    return this.knex.select('characteristics.*').from('characteristics')
    .leftJoin("apartments_characteristics","apartments_characteristics.characteristic_id","characteristics.id")
    .leftJoin("apartments","apartments.id","apartments_characteristics.apartment_id")
    .where('characteristics.id',charId)
  }
}

