
import { useState } from "react";
import { compareObjects, getGroupsApi, deleteGroupApi } from "../api/groups";
import {deletePersonApi, deleteRoleApi} from '../api/person';
import { useAuth } from "./useAuth";

export function useGroups() {
    const { auth } = useAuth();
    const [groups, setGropus] = useState<any | null>(null);
    const [loading, setLoading] =  useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);

   
    

const getGroups = async () => {
    try {
      setLoading(true);
      const response = await getGroupsApi(auth);
      setLoading(false);
      setGropus(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addGroup = async (data:{}) => {
    try {
      setLoading(true);
      if(auth != null){
        await compareObjects(data, auth, '')
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  const updateGroup = async (id:any, data:{}) => {    
    try {
      setLoading(true);
      if(auth != null){
        await compareObjects(data, auth,  id);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }
  const deleteGroup = async (id:any) => {
    try {
      setLoading(true);
      if(auth != null){
        await deleteGroupApi(id, auth);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }
const deletePerson = async  (data:any, person:any) =>{
  try {
     setLoading(true);
    if(auth != null){
    deletePersonApi(data, person, auth)
    }
  } catch (error) {
    setLoading(false);
    setError(error);
  }
}
const deleteRole = async  (data:any, role:any) =>{
  try {
     setLoading(true);
    if(auth != null){
    deleteRoleApi(data, role, auth)
    }
  } catch (error) {
    setLoading(false);
    setError(error);
  }
}
  
    return {
        loading,
        error,
        groups,
        getGroups,
        addGroup,
        updateGroup,
        deleteGroup,
        deletePerson,
        deleteRole
    }
}
