import { Controller,Body,Post,Get,Param, UseInterceptors,  UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

import {ApartmentsService} from './apartments.service';
import { SaveImageApartmentDto } from './dto/save-apartment.dto';
import { UpdateApartmentDescriptionDto } from './dto/update-apartment-description.dto';


import {storage} from './utils/apartmentStorage';

@Controller('apartments')
export class ApartmentsController {

	constructor(private readonly apartmentsService: ApartmentsService) {}

	@Get('/show/all')
	async showAll(){
		return this.apartmentsService.findAll();
	}
	@Get('/show/:apartmentId')
	async show(@Param('apartmentId') apartmentId:string){
		// по id находим
		return this.apartmentsService.findOne(apartmentId);
	}

	@Post('/upload')
	@UseInterceptors(FileInterceptor("photo", { storage}))
  	uploadSingle(@UploadedFile() file) {

    let imgArr = file.destination.split('/');
    let imagePath  =`${imgArr[imgArr.length-1]}/${file.filename}`;
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

  @Post('/save-images-to-apartment')
  async saveImagesToApartment(@Body() saveImageApartmentDto: SaveImageApartmentDto ){
      return await this.apartmentsService.saveImages(saveImageApartmentDto);
  }
	
}
