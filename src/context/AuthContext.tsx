import { useState, useEffect, createContext } from "react";
import { setToken, setUser, getToken, getUser, removeToken, removeUser } from "../api/token";

export const AuthContext = createContext({
     auth: undefined,
     login: (token: string, user: {}) => {},
    logout: () => console.log('cerrando sesion')
});

export function AuthProvider(props:any) {
  const { children } = props;
  const [auth, setAuth] = useState<any | undefined>(undefined);
  
  useEffect(() => {
    (async () => {
      const token = getToken();
      const user = getUser();
      if (token && user) {
        setAuth({ token, user });
      } else {
        setAuth(null);
      }
    })();
  }, []);

   const login = async (token: string, user: {}) => {
    setToken(token);
    setUser(user);
    setAuth({ token, user });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      removeUser();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout
  };

   if (auth ===  undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}