import { Controller, Get, Post, Query,Body, Param } from '@nestjs/common';
import { CharsService } from './chars.service';
import { CreateCharDto } from './dto/create-char.dto';

@Controller('chars')
export class CharsController {

  constructor(private readonly charsService: CharsService) {}

  @Get('/')
  async show(@Query('charKeyName') charKeyName: string){
    return this.charsService.findAll(charKeyName);
  }
  @Post('/create')
  async create(@Body() createCharDto: CreateCharDto){
    return this.charsService.create(createCharDto);
  }
  // /chars/${data.charId}/add-apartment/${apartmentId}
  @Post('/:charId/add-apartment/:apartmentId')
  addApartmentToChar(
    @Param('charId') charId: string,
    @Param('apartmentId') apartmentId: string){
      return this.charsService.addApartment(+charId,+apartmentId);
      
  }
}
