import { api } from "@/services/apiClient";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import decode from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  usnDesUsername: string;
  usnDesName: string;
  usnCod: number;
};

export type SignCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user?: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  const { "ec.token": token, "ec.refreshToken": refreshToken } = parseCookies();
  if (token || refreshToken) {
    authChannel.postMessage("signOut");
  }
  destroyCookie(undefined, "ec.refreshToken");
  destroyCookie(undefined, "ec.token");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { "ec.token": token } = parseCookies();
    var retorno = token != null || token != undefined;
    setIsAuthenticated(retorno);
  }, [typeof window !== "undefined" ? Router.asPath : ""]);

  function signOut() {
    const { "ec.token": token, "ec.refreshToken": refreshToken } =
      parseCookies();
    if (token || refreshToken) {
      authChannel.postMessage("signOut");
    }
    destroyCookie(undefined, "ec.refreshToken");
    destroyCookie(undefined, "ec.token");

    setUser({ usnDesUsername: "", usnDesName: "", usnCod: null });

    Router.push("/");
  }

  useEffect(() => {
    try {
      const { "ec.token": token } = parseCookies();
      const tokendDecode = decode<{
        usnDesUsername: string;
        usnDesName: string;
        usnCod: number;
      }>(token);
      setUser({
        usnDesUsername: tokendDecode.usnDesUsername,
        usnDesName: tokendDecode.usnDesName,
        usnCod: tokendDecode.usnCod,
      });
    } catch (e) {
      signOut();
    }
  }, []);


  async function signIn({ email, password }: SignCredentials) {
    try {
      const response = await api.post("login", {
        username: email,
        password,
      });

      const { token, refreshToken, usnCod, usnDesName } = response.data;

      setCookie(undefined, "ec.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
      });
      setCookie(undefined, "ec.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
      });

      await setUser({
        usnDesUsername: email,
        usnDesName,
        usnCod,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

    } catch (err) {
      throw err;
    }

  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
