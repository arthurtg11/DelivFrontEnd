import { signOut } from "@/contexts/AuthContext";
import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue = [];

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies["ec.token"]}`,
    },
  });

  // api.interceptors.request.use((c) => {
  //   return c;
  // });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        if (error.response.data?.error === "token_expired") {
          cookies = parseCookies(ctx);

          const { "ec.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            api
              .post("/configNoAuth/token/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { access_token: token } = response.data;

                setCookie(ctx, "ec.token", token, {
                  maxAge: 60 * 60 * 24 * 30, //30 days
                  path: "/",
                });
                setCookie(ctx, "ec.refreshToken", response.data.refresh_token, {
                  maxAge: 60 * 60 * 24 * 30, //30 days
                  path: "/",
                });
                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));
                failedRequestQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            destroyCookie(ctx, "ec.token", {
              maxAge: 60 * 60 * 24 * 30, //30 days
              path: "/",
            });
            destroyCookie(ctx, "ec.refreshToken", {
              maxAge: 60 * 60 * 24 * 30, //30 days
              path: "/",
            });
            Promise.reject(new AuthTokenError());
          }
        }
      } else {
        // destroyCookie(ctx, "ec.token", {
        //   maxAge: 60 * 60 * 24 * 30, //30 days
        //   path: "/",
        // });
        // destroyCookie(ctx, "ec.refreshToken", {
        //   maxAge: 60 * 60 * 24 * 30, //30 days
        //   path: "/",
        // });
      }
      return Promise.reject(error);
    }
  );

  return api;
}
