import axios, { AxiosResponse } from "axios";


import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../configs";
import {IApartment} from '../interfaces/apartment-interface';


async function getPathsOfLoadedFiles(files: any[]){
  let imagesResponses:any = [];
  for await (let imgData of files.map(async (file)=>{
    try{
      const response = await axios({
                headers: { "Content-Type": "multipart/form-data" },
                method:"POST",
                data: fileToPost(file, 'photo'),
                url:`${apiUrl}/apartments/upload`}) as AxiosResponse<any>  ; 
    response.data.error = false;
    return response;
    } catch(err){
      return {data : {error: true}};
    }
}) ) { 
    imagesResponses.push(imgData)
}
// для всех изображений сохранить их пути в данном апартаменте
// do axios to save filePaths
return imagesResponses.filter((imgResp:any)=>!imgResp.data.error);

}

function fileToPost(file: any, fieldKey:string){
  let sendedFormData =  new FormData();
  sendedFormData.append(fieldKey,file);
  return sendedFormData;
}


export const UploadApartmentFilesAction= createAsyncThunk(
  "apartments/uploadFilesById",
async( {id, files }:{id:number,files: any[]})=>{

  let imagesResponses = await getPathsOfLoadedFiles(files);
  return await axios.post(`${apiUrl}/apartments/save-image-to-apartment`,{id, images: JSON.stringify( imagesResponses.map(({data}:{data:any})=>data.pathToFile))});
  //TODO: создать роут обрабатывающий загрузку файлов
  /**
   * 1. роут получает список файлов
   * 2. роут сохраняет файлы в папку на сервере
   * 3. названия файлов сохранятся в поле массив images для квартиры с данным id из таблицы апартаментов
   */
  
});
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