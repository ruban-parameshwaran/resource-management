import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@src/app/store";
import { AppConst } from "@src/const/AppConst";
import { AuthUser, Credentials } from "@src/interface/AuthUser";

interface ApiResponse {
  success: string;
  message: string;
  data?: AuthUser;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: AppConst.BaseURL,
    credentials: 'include',
    prepareHeaders(headers, {getState}) {
        const token = (getState() as RootState).user.token;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
  }),
  endpoints: (build) => ({
    initCsrf: build.mutation<void, void>({
      query() {
        return {
          url: "sanctum/csrf-cookie",
          credentials: 'include'
        }
      }
    }),
    userLogin: build.mutation<ApiResponse, Credentials>({
      query(body: Credentials) {
        return {
          url: "/api/login",
          method: "POST",
          body,
        };
      },
    }),
    userLogout: build.mutation<void, void>({
      query() {
        return {
          url: "/api/logout",
          method: "POST",
        }
      }
    })
  }),
});

export const  {
  useInitCsrfMutation,
  useUserLoginMutation,
  useUserLogoutMutation
} = authApi;