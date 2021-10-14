

import { Expose } from 'class-transformer';



export class Char {
  @Expose()
  charId: number;
  @Expose()
  keyName: string;
  @Expose()
  apartmentId: number;
}

export class ApartmentDto {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
  chars: Char[];
}
export function apartmentToDto(apartment: any): ApartmentDto {
    return {
      id: apartment.id,
      name: apartment.name,
      price: apartment.price,
      description: apartment.description,
      images: JSON.parse(apartment.images),
      
      chars: [ ...apartment.chars.map((c:any)=>{
        c.ARRAY_VALUE = JSON.parse(c.ARRAY_VALUE);
        c.keyName = c.key_name;
        delete c.key_name;
        return c;
      }),
    ],
    }
  
}
