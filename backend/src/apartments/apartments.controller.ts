import { Controller,Headers,Body,Post,Get,Param, UseInterceptors,  UploadedFile, HttpException, HttpStatus, UnauthorizedException, Req, Res } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

import {ApartmentsService} from './apartments.service';
import { BearerCheck } from './decorators/BearerDecorator';
import { SaveImageApartmentDto } from './dto/save-apartment.dto';
import { UpdateApartmentDescriptionDto } from './dto/update-apartment-description.dto';


import {storage} from './utils/apartmentStorage';

const jwt = require('jsonwebtoken');





class TokenExpiredError extends Error { 
	constructor(message){
		super(message);
		Object.setPrototypeOf(this, TokenExpiredError.prototype);
	}

}
async function verifyUser(token:string){
	return new Promise((resolve,reject)=>{
		jwt.verify(token,'kitty_missy',(err, decoded)=>{
			if(err){
				if(err instanceof jwt.TokenExpiredError){
					throw new TokenExpiredError('Время токена истекло');
				}
				reject(err);
			}
			return resolve(decoded);
		})
	}); 
}

async function generateToken(id:number,email:string, time:number){
	return new Promise((resolve, reject)=>{
		jwt.sign({
			exp: Math.floor(Date.now()/1000) + time,
			id, 
			email
		},'kitty_missy', (err:any,token:any)=>{
			if(err){
				return reject(err);
			};
			return resolve(token);
		});
	});
}
 async function signUser(id:number, email:string ){

	return new Promise((resolve, reject)=>{
		jwt.sign({
			exp: Math.floor(Date.now()/1000) + 30*1,
			id, 
			email
		},'kitty_missy', (err:any,token:any)=>{
			if(err){
				return reject(err);
			};
			return resolve(token);
		});
	});
}

@Controller('apartments')
export class ApartmentsController {
	constructor(private readonly apartmentsService: ApartmentsService) {}

	@Get('/cookie-get')
	getCookie(@Req() req){
		return {
			cookie: req.cookies['color']
		};
	}
	@Get('/cookie-set')
	setCookie(@Req() req, @Res() res){
		res.cookie('color','green');
		return res.json({
			status:'ok'
		});
	}
	

	@Post('/get-protected-data')
	getProtDataWithDecorator(@BearerCheck() bearer:string){
	
		return {
			status:'ok',
			message:[{id:1, name:'Vasia'},{id:2, name:'Jason'},{id:3, name:'Semon'}]
		}
	}

	@Post('/get-protected-data-test')
	async testVerify(
		@Headers('Authorization') auth: string
		){
		const token = auth.split(' ')[1];
		try {
			await verifyUser(token);
		} catch(err){
			if(err instanceof TokenExpiredError){
				throw new UnauthorizedException('Время токена истекло');
			}
		}
		return {
			status:'ok',
			protectedData: [{id:1,name:'Vasia'},{id:2 , name:'Kolya'}]
		}
	}
	@Post('/sign')
	async signUser(@Res() res, @Body() user:{id: number, email: string}){

		// create hashed token and create refresh token
		// store refresh token somewhere here
		const token = await signUser(user.id, user.email);
 
		const refreshToken =  await generateToken(user.id, user.email , 60*60); 
		res.json({
			status:"ok",
			token,
			refreshToken
		});
	}
	
	@Post('/test-token')
	rejectData(@Headers('Authorization') auth: string){
		return {
			token: auth
		}
	}

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
	
	@Get('/test-group')
	async testGroup(){
		return this.apartmentsService.grouping();
	}
}
