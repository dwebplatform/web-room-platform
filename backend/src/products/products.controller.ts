import { Controller,Get,Post,Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private  readonly productsService: ProductsService){}
  
  @Get('/all')
  async all(){
    return this.productsService.findAll();
  }
  
  @Get('/check')
 async checkTestRes(){
   return [];
  }

  @Post('/')
  async create(@Body() createProductDto: CreateProductDto){
    return this.productsService.create(createProductDto);
  }
}
