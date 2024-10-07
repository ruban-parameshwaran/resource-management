
import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./axiosBaseQuery";
import { ApiResponse, Delivery } from "@src/interface/Delivery";

export const deliveryApi = createApi({
	reducerPath: 'delivery',
    baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getAllDelivery: build.query<ApiResponse, void>({
            query() {
                return {
                    url: "/api/deliveries",
                    method: "GET"
                };
            },
        }),

        // create delivery
        createDelivery: build.mutation<ApiResponse, Delivery>({
            query(body: Delivery) {
                return {
                    url: 'api/deliveries',
                    method: 'POST',
                    data: body
                }
            }
        }),

        // update delivery
        updateDelivery: build.mutation<ApiResponse, Delivery>({
            query(data: Delivery) {
                const { id } = data;
                return {
                    url: `api/deliveries/${id}`,
                    method: 'PUT',
                    data: data
                }
            }
        }),

        // update delivery
        deleteDelivery: build.mutation<ApiResponse, number>({
            query(id: number) {
                return {
                    url: `api/deliveries/${id}`,
                    method: 'DELETE'
                }
            }
        }),
	})
});

export const {
	useGetAllDeliveryQuery,
    useCreateDeliveryMutation,
    useUpdateDeliveryMutation,
    useDeleteDeliveryMutation
} = deliveryApi;