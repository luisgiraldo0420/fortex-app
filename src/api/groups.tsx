import React, {useState} from 'react'
import { API_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { Group } from '../types';


/*Hacemos la petición para traer la información del detalle del producto */
export async function getGroupsApi(token: any) {  
  try {
    const url = `${API_URL}group/`;
    const params = {
      headers: {
        Authorization: `${token.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addGroupApi(data:Group, token:any) {
  try {
    const url = `${API_URL}group/create`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function editGroupApi(id:Group, data:Group, token: any){
  try {
    const url = `${API_URL}group/update/?id=${id}`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    
    throw error;
  }

}

export async function deleteGroupApi(id:Group, token:any) {
  try {
    const url = `${API_URL}group/delete/?id=${id}`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `${token.token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}



export async function compareObjects (data:any, token: any, id:any){
  const response = await getGroupsApi(token);
  const groupsDb = response.groups;
  let exist = false 
  groupsDb.filter((element:any) => {
    if(element.name.toString().toLowerCase().includes(data.name.toLowerCase())){
      exist = true
    }
  })
  if (exist === false){
    if(id){
      editGroupApi(id, data, token);
    }else{
      addGroupApi(data, token);
    }
  }else if (exist === true){
    toast(`El grupo ya existe`);
  }
}


