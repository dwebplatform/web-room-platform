import { IsNotEmpty,IsEnum } from "class-validator";
import { STATUSES } from "./order.dto";

export class UpdateOrderStatusDto {

  @IsNotEmpty()
  id: number;
  
  @IsEnum(STATUSES)
  newStatus: string;
}