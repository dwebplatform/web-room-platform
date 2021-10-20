import axios, { AxiosResponse } from "axios";


import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../configs";
import { IChar } from './../interfaces/apartment-interface';
import { customAxios } from "../api/customAxios";


export const CreateCharAction = createAsyncThunk(
  "chars/createChar",
  async({keyName, charVariant,charValue ,apartmentId} : {keyName: string, charVariant: string,charValue: string| string[]| boolean , apartmentId?: null|number})=>{
    const {data} =  await customAxios.post(`${apiUrl}/chars/create`,{
        keyName, 
        charVariant,
        charValue
    }) as AxiosResponse<IChar>;
    console.log(apartmentId);
    if(apartmentId !== null){

      try{
        let subResponse = await customAxios.post(`${apiUrl}/chars/${data.charId}/add-apartment/${apartmentId}`);
        console.log(subResponse.data);

      } catch(err){
        console.error("Error:",err);
      }
    }
    return data;
  }
);
export const GetCharsAction = createAsyncThunk(
  "chars/getChars",
  async ({ charKeyName }: { charKeyName: string }) => {
    let reqStr = `${apiUrl}/chars/`;
    if(charKeyName){
      reqStr+=`?charKeyName=${charKeyName}`;
    }
    const resp =  await customAxios.get(reqStr) as AxiosResponse<IChar[]>;
    
    return resp;
  });
