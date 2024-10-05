import { createApi } from "@reduxjs/toolkit/query/react";
import { Category } from "@src/interface/Category";
import axiosBaseQuery from "./axiosBaseQuery";

interface ApiResponse {
    success: string;
    message: string;
    data: Category[];
}

interface SingleApiResponse {
    data: Category
}

type formValue = {
  name: string;
};

export const categoryApi = createApi({
    reducerPath: "category",
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        // create category
        createCategory: build.mutation<ApiResponse, formValue>({
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
                    url: "/api/categories/get-all",
                    method: "GET"
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

        // delete category by id
        updateCategory: build.mutation<ApiResponse, any>({
            query(values) {
                let {id, name} = values;
                const payload = {
                    name: name
                }
                return {
                    url: `/api/categories/${id}`,
                    method: "PUT",
                    data: payload
                };
            },
        }),

        // get category by id
        showCategory: build.query<SingleApiResponse, number>({
            query(id: number) {
                return {
                    url: `/api/categories/${id}`,
                    method: "GET"
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
    useLazyShowCategoryQuery
 } = categoryApi;
