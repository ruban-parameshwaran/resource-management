import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@src/app/store";
import { AppConst } from "@src/const/AppConst";
import { Category } from "@src/interface/Category";

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
    baseQuery: fetchBaseQuery({
        baseUrl: AppConst.BaseURL,
        prepareHeaders(headers, { getState }) {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        // create category
        createCategory: build.mutation<ApiResponse, formValue>({
            query(body: formValue) {
                return {
                    url: "/api/categories/create-category",
                    method: "POST",
                    body,
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
                    body: payload
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
