import { createApi } from "@reduxjs/toolkit/query/react";
import { Category, CategoryPayload } from "@src/interface/Category";
import axiosBaseQuery from "./axiosBaseQuery";
import { ApiResponse } from "@src/interface/Api";

interface SingleApiResponse {
  data: Category;
}

type formValue = {
  id: number;
  name: string;
};

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    // create category
    createCategory: build.mutation<ApiResponse, CategoryPayload>({
      query(body: formValue) {
        return {
          url: "/api/categories/create-category",
          method: "POST",
          data: body,
        };
      },
    }),

    // get all categories
    getAllCategory: build.query<ApiResponse, void>({
      query() {
        return {
          url: `/api/categories/get-all`,
          method: "GET",
        };
      },
    }),

    // delete category by id
    deleteCategory: build.mutation<ApiResponse, number>({
      query(id: number) {
        return {
          url: `/api/categories/${id}`,
          method: "DELETE",
        };
      },
    }),

    // Update category by id
    updateCategory: build.mutation<ApiResponse, CategoryPayload>({
      query(data: Category) {
        const { id } = data;
        return {
          url: `/api/categories/${id}`,
          method: "PUT",
          data: data,
        };
      },
    }),

    // get category by id
    showCategory: build.query<SingleApiResponse, number>({
      query(id: number) {
        return {
          url: `/api/categories/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useShowCategoryQuery,
  useLazyShowCategoryQuery,
} = categoryApi;
