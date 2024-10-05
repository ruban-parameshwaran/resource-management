
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Customer, CustomerPayload } from "@src/interface/customer";
import axiosBaseQuery from "./axiosBaseQuery";

export const customerApi = createApi({
	reducerPath: 'customer',
    baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getAllCustomer: build.query<ApiResponse, void>({
            query() {
                return {
                    url: "/api/customers",
                    method: "GET"
                };
            },
        }),

        // create customer
        createCustomer: build.mutation<ApiResponse, CustomerPayload>({
            query(body: Customer) {
                return {
                    url: 'api/customers',
                    method: 'POST',
                    data: body
                }
            }
        }),

        // update customer
        updateCustomer: build.mutation<ApiResponse, CustomerPayload>({
            query(body: Customer) {
                const { id } = body;
                return {
                    url: `api/customers/${id}`,
                    method: 'PUT',
                    data: body
                }
            }
        }),

        // update customer
        deleteCustomer: build.mutation<ApiResponse, number>({
            query(id: number) {
                return {
                    url: `api/customers/${id}`,
                    method: 'DELETE'
                }
            }
        }),
	})
});

export const {
	useGetAllCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApi;