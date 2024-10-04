import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@src/app/store";
import { AppConst } from "@src/const/AppConst";
import { ApiResponse, Product, ProductPayload } from "@src/interface/Product";


export const productApi = createApi({
    reducerPath: 'product',
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
                    body
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
                    body
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