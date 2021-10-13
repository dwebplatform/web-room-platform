import { Expose } from 'class-transformer';

export class SaveImageApartmentDto {
  @Expose()
  id: number;
  @Expose()
  images: string[];
}