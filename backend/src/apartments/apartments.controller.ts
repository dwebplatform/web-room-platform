import { Controller,Body,Post,Get,Param, UseInterceptors,  UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

import {ApartmentsService} from './apartments.service';
import { UpdateApartmentDescriptionDto } from './dto/update-apartment-description.dto';


import {storage} from './utils/apartmentStorage';

@Controller('apartments')
export class ApartmentsController {

	constructor(private readonly apartmentsService: ApartmentsService) {}

	@Get('/show/:apartmentId')
	async show(@Param('apartmentId') apartmentId:string){
		// по id находии
		return this.apartmentsService.findOne(apartmentId);
	}

	@Post('/upload')
	@UseInterceptors(FileInterceptor("photo", { storage}))
  	uploadSingle(@UploadedFile() file) {

    let imagePath  =`${file.destination.split('/')[file.destination.length-1]}/${file.filename}`;
    return {
      imagePath,
    	statusCode:"200",
    	msg:"ok"
    };
  }
	@Post('/change-description')
	async changeDescription(@Body() updateApartmentDescriptionDto: UpdateApartmentDescriptionDto){
		return await this.apartmentsService.updateDescription(updateApartmentDescriptionDto);
	}

	
}
