
import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./axiosBaseQuery";
import { ApiResponse, OrderInitialValues } from "@src/interface/order";


export const orderApi = createApi({
	reducerPath: 'order',
    baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getAllOrder: build.query<ApiResponse, void>({
            query() {
                return {
                    url: "/api/orders",
                    method: "GET"
                };
            },
        }),

        // create Order
        createOrder: build.mutation<ApiResponse, OrderInitialValues>({
            query(body: OrderInitialValues) {
                return {
                    url: 'api/orders',
                    method: 'POST',
                    data: body
                }
            }
        }),

        // update Order
        updateOrder: build.mutation<ApiResponse, OrderInitialValues>({
            query(data: OrderInitialValues) {
                const { id } = data;
                return {
                    url: `api/orders/${id}`,
                    method: 'PUT',
                    data: data
                }
            }
        }),

        // update Order
        deleteOrder: build.mutation<ApiResponse, number>({
            query(id: number) {
                return {
                    url: `api/orders/${id}`,
                    method: 'DELETE'
                }
            }
        }),
	})
});

export const {
	useGetAllOrderQuery,
    useCreateOrderMutation,
    useDeleteOrderMutation,
    useUpdateOrderMutation
} = orderApi;