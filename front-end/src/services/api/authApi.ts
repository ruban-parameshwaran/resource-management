import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthUser, Credentials } from "@src/interface/AuthUser";
import axiosBaseQuery from "./axiosBaseQuery";

interface ApiResponse {
  success: string;
  message: string;
  data: AuthUser;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: axiosBaseQuery(),
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
          data: body,
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