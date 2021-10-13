import { Expose } from "class-transformer";


export class CharDto {
  @Expose()
  id: number;
  @Expose()
  type: string;


  @Expose()
  charId: number;
  
  @Expose()
  ARRAY_VALUE: string[];
  
  @Expose()
  STRING_VALUE: string;
  @Expose()
  BOOL_VALUE: number;

  @Expose()
  keyName: string;
}

export function charToDto(c:any):CharDto{
  let copy = {...c};

  copy.ARRAY_VALUE = JSON.parse(copy.ARRAY_VALUE);
  copy.charId = copy.id;
  copy.keyName =copy.key_name;
  delete  copy.key_name;

  return copy;
}