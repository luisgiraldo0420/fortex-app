import { TOKEN, USER } from "../utils/constants";

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);


}
export function setUser(user: any) {
  localStorage.setItem(USER, user);

}

export function getToken() {
  return localStorage.getItem(TOKEN);
}
export function getUser() {
  return localStorage.getItem(USER);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}
export function removeUser() {
  localStorage.removeItem(USER);
}