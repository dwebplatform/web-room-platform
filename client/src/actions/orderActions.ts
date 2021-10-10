import axios, { AxiosResponse } from "axios";


import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../configs";
import { IOrder } from "../interfaces/order-interface";


interface IMoreOrder  extends IOrder{
  newState: string;
}
export const ChangeOrderStatus= createAsyncThunk(
  "orders/changeStatus",
  async ({id, newStatus}:{
    id: number,
    newStatus: string
  })=>{
    return await axios.post<{
      id: number,
      newStatus: string
    }>(`${apiUrl}/orders/change-status`,{
      id,
      newStatus
    }) as AxiosResponse<unknown|IOrder>;
  }
 
  );
export const GetOrders = createAsyncThunk(
  "orders/getOrders",
  async () => await axios.get<IOrder[]>(`${apiUrl}/orders`)
);


export const GetOrderById = createAsyncThunk(
  "orders/getOrder",
  async (id:string)=> await axios.get<IOrder>(`${apiUrl}/orders/${id}`)
);
