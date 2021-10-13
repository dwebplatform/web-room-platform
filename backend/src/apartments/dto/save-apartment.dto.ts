import { Expose } from 'class-transformer';

export class SaveImageApartmentDto {
  @Expose()
  id: number;
  @Expose()

  images: string[];
  @Expose()
  get insertedImages(){
    return JSON.stringify(this.images);
  }
}