import { Group, Person } from "../types";
import { API_URL } from "../utils/constants";

export async function deletePersonApi(data:Group, newValues:Person, token:any) {
    const {id:groupId, people} = data;    
    let oldValues = people.map((person:Person) =>  person.id)
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

  export async function deleteRoleApi(data:Group, newValues:Person, token:any) {
    
    const {id:groupId, roles} = data;
    
    let oldValues = roles.map((role:Person) =>  role.id)
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