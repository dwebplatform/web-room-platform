import axios, { AxiosResponse } from "axios";


import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../configs";
import { IChar } from './../interfaces/apartment-interface';



export const CreateCharAction = createAsyncThunk(
  "chars/createChar",
  async({keyName, charVariant,charValue} : {keyName: string, charVariant: string,charValue: string| string[]| boolean})=>{

    return await axios.post(`${apiUrl}/chars/create`,{
        keyName, 
        charVariant,
        charValue
    });
  }
);
export const GetCharsAction = createAsyncThunk(
  "chars/getChars",
  async ({ charKeyName }: { charKeyName: string }) => {
    let reqStr = `${apiUrl}/chars/`;
    if(charKeyName){
      reqStr+=`?charKeyName=${charKeyName}`;
    }
    const resp =  await axios.get(reqStr) as AxiosResponse<IChar[]>;
    
    return resp;
  });
