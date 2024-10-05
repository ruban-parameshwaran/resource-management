import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Product } from "@src/interface/Product";
import axiosBaseQuery from "./axiosBaseQuery";


export const productApi = createApi({
    reducerPath: 'product',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getAllProductList: build.query<ApiResponse, void>({
            query() {
                return {
                    url: "/api/products",
                    method: "GET",
                };
            },
        }),

        // create product
        createProduct: build.mutation<ApiResponse, Product>({
            query(body: Product) {
                return {
                    url: 'api/products',
                    method: 'POST',
                    data: body
                }
            }
        }),

        // delete product
        deleteProduct: build.mutation<ApiResponse, number>({
            query(id: number) {
                return {
                    url: `api/products/${id}`,
                    method: 'DELETE',
                }
            }
        }),

        // update product
        updateProduct: build.mutation<ApiResponse, Product>({
            query(body: Product) {
                const { id } = body;
                return {
                    url: `api/products/${id}`,
                    method: 'PUT',
                    data: body
                }
            }
        })
    })
});


export const {
    useGetAllProductListQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productApi;