
import {IsString, IsNotEmpty, IsEnum} from 'class-validator';

enum CHAR_VARIANTS {
  ARRAY_VALUE  ='ARRAY_VALUE',
  STRING_VALUE = 'STRING_VALUE',
  BOOL_VALUE   = 'BOOL_VALUE'
};
export class CreateCharDto {

  @IsString()
  keyName: string;
  @IsEnum(CHAR_VARIANTS)
  charVariant: string;
  @IsNotEmpty()
  charValue: string| string[]| boolean;

}