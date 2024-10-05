// axiosBaseQuery.ts
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosClient from "@src/utils/axiosClient";

interface AxiosBaseQueryArgs extends AxiosRequestConfig {}

const axiosBaseQuery = (): BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  unknown
> => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosClient({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
