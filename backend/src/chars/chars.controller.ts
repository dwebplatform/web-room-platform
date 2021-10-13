import { Controller, Get, Post, Query,Body } from '@nestjs/common';
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
  async create(@Body() createCharDto:CreateCharDto){
    return this.charsService.create(createCharDto);
  }
}
