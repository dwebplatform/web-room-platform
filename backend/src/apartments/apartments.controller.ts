import { Controller,Post,Get,Param, UseInterceptors,  UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import {diskStorage} from 'multer';

import {ApartmentsService} from './apartments.service';




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
    return {
    	statusCode:"200",
    	msg:"ok"
    };
  }

}
