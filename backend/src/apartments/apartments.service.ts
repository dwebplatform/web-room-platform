import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

const knexPopulate = require('knex-populate');

function groupBy(list, keyGetter) {
		    const map = new Map();
		    list.forEach((item) => {
		         const key = keyGetter(item);
		         const collection = map.get(key);
		         if (!collection) {
		             map.set(key, [item]);
		         } else {
		             collection.push(item);
		         }
		    });
		    return map;
		}


@Injectable()
export class ApartmentsService {
	constructor(@InjectConnection() private readonly knex: Knex) { }
	async findOne(apartmentId: string){
		const apartment =  await this.knex.table('apartments').where('id','=',apartmentId).first();
		if(!apartment){
			throw new HttpException('Не удалось получить квартиры с таким id', HttpStatus.BAD_REQUEST);
		}
		
		const chars = await this.knex.select(
			'characteristics.id as charId','characteristics.key_name', 'a.id as apartmentId')
		.from('apartments as a')
		.leftJoin('apartments_characteristics','a.id','=','apartments_characteristics.apartment_id')
		.leftJoin('characteristics','apartments_characteristics.characteristic_id','=','characteristics.id')
		.where('a.id','=',apartmentId).andWhereNot('characteristics.id',null);

		return {
			...apartment,
			chars
		};
	}
}
