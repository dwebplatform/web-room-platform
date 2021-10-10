
import {IsString, IsNotEmpty} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({message:'Не было передано поле title'})
  title: string;

  @IsNotEmpty()
  @IsString({message:'Нe было передано поле price'})
  price: string;
}