export interface IChar {
  charId: number;
  key_name: string;
  type: string;
  ARRAY_VALUE: string[]|null;
  STRING_VALUE: string|null;
  BOOL_VALUE: number|null;
  apartmentId: number;
}

export interface IApartment {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string;
  chars: IChar[];
}