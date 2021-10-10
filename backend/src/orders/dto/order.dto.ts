export enum STATUSES {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING'
};


export interface Client {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface Apartment {
  id: number;
  name: string;
  from: string;
  to: string;
}

export interface Info {
  client: Client;
  totalPrice: number;
  apartment: Apartment;

}


export class OrderDto {
  id: number;
  status: STATUSES;
  createdAt: string;
  info: Info;
  comments: Array<any>|[] ;
}

export function orderToDto(order:any){
  return {
    ...order,
    info: JSON.parse(order.info)
  };
}