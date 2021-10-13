import { Expose } from 'class-transformer';
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
  charValue: string|string[] | boolean;

  @Expose()
  get char(){
    if(this.charVariant === CHAR_VARIANTS.ARRAY_VALUE){
      let isCharArray = false;
      try{
        Array.isArray(this.charValue);
        isCharArray = true;
      } catch(err){
        isCharArray = false;
      }
      if(isCharArray){
        return JSON.stringify(this.charValue);
      }
    }
    return this.charValue;
  }

  @Expose()
  get type(){
    return this.charVariant.split('_')[0];
  }

}