import { map } from "lodash";
import { Group, Person } from "../types";
import { API_URL } from "../utils/constants";

export async function deletePersonApi(data:Group, id:Person, token:any) {
    const {id:groupId, people} = data;    

  let oldValues =  map(people.filter((person:Person) => person.active)).map((person:Person) =>  person.id)

  let newValues = oldValues.filter((personId:any) => personId !== id )


    try {
      const url = `${API_URL}group/manage-members`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({groupId, oldValues, newValues}),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function deleteRoleApi(data:Group, id:Person, token:any) {
    
    const {id:groupId, roles} = data;
  
  
  let oldValues =  map(roles.filter((rol:Person) => rol.active)).map((role:Person) =>  role.id)

  let newValues = oldValues.filter((roleId:any) => roleId !== id )
      
    try {
      const url = `${API_URL}group/manage-roles`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({groupId, oldValues, newValues}),
      };
      const response = await fetch(url, params);      
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function assignRoleApi(dataOld:any, newValues:any, token:any ){

    let oldValues = dataOld.roles.map((role:Person) =>  role.id)
    const groupId = dataOld.id
   

    try {
      const url = `${API_URL}group/manage-roles`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({groupId, oldValues, newValues}),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  export async function assignPersonApi(dataOld:any, newValues:any, token:any ){

    let oldValues = dataOld.people.map((person:Person) =>  person.id)
    const groupId = dataOld.id
   

    try {
      const url = `${API_URL}group/manage-members`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({groupId, oldValues, newValues}),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }