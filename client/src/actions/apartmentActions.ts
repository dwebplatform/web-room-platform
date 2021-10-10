import axios, { AxiosResponse } from "axios";


import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../configs";
import {IApartment} from '../interfaces/apartment-interface';

export const GetApartmentByIdAction = createAsyncThunk("apartments/getApartmentById",
async(id:number)=>{
  return await axios.get<IApartment>(`${apiUrl}/apartments/show/${id}`);
});

export const ChangeApartmentDescription = createAsyncThunk("apartments/changeDescription",
async ({id,description}:{id: number, description:string}) => {
    return (await axios.post<{id: number, description:string}>(`${apiUrl}/apartments/change-description`,{
      id,
      description
    }));
});