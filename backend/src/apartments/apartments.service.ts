import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { apartmentToDto } from './dto/apartment.dto';
import { UpdateApartmentDescriptionDto } from './dto/update-apartment-description.dto';
import { SaveImageApartmentDto } from './dto/save-apartment.dto';


@Injectable()
export class ApartmentsService {
	constructor(@InjectConnection() private readonly knex: Knex) {}
	
	async saveImages(saveImageApartmentDto:SaveImageApartmentDto){
		try{
			let updatedId =  await this.knex.table('apartments').update({images:saveImageApartmentDto.insertedImages}).where({id:saveImageApartmentDto.id});
			return await this.knex.table('apartments').where('id',updatedId).first();
		} catch(e){
			throw new HttpException('Не удалось обновить изображения для данной квартиры', HttpStatus.BAD_REQUEST);
			
		}
	}

	async updateDescription(updateApartmentDescriptionDto:UpdateApartmentDescriptionDto){
		const apartmentId = await this.knex('apartments').where({id: updateApartmentDescriptionDto.id}).update({
			description: updateApartmentDescriptionDto.description
		});
		const apartment =  await this.knex('apartments').where({id:apartmentId}).first();
		return {id:apartment.id, description: apartment.description};
	}

	async findOne(apartmentId: string){
		const apartment =  await this.knex.table('apartments').where('id','=',apartmentId).first();
		if(!apartment){
			throw new HttpException('Не удалось получить квартиры с таким id', HttpStatus.BAD_REQUEST);
		}
		
		const chars = await this.knex.select(
			'characteristics.id as charId','characteristics.key_name',
			'characteristics.type as type',
			'characteristics.ARRAY_VALUE as ARRAY_VALUE',
			'characteristics.STRING_VALUE as STRING_VALUE',
			'characteristics.BOOL_VALUE as BOOL_VALUE',
			'a.id as apartmentId')
		.from('apartments as a')
		.leftJoin('apartments_characteristics','a.id','=','apartments_characteristics.apartment_id')
		.leftJoin('characteristics','apartments_characteristics.characteristic_id','=','characteristics.id')
		.where('a.id','=',apartmentId).andWhereNot('characteristics.id',null);

		return apartmentToDto({...apartment,chars});
	}
}
