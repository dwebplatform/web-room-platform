import {IsString, IsNotEmpty} from 'class-validator';

export class UpdateApartmentDescriptionDto{
  @IsNotEmpty()
  id: number;
  @IsString()
  description: string;
}