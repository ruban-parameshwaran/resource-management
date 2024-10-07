import { Customer } from "./customer";
import { Delivery } from "./Delivery";

export interface ApiResponse {
    success: string;
    message: string;
    data: Order[];
}

export interface Order {
    id?: number | null;
    order_num: string;
    customer: Customer
    order_date: string;
    order_amount: number;
    payment_method: string;
    status: string;
    delivery: Delivery;
}

export interface OrderInitialValues {
    id?: number | null;
    order_num: string;
    customer_id: number | null;
    order_date: string;
    order_amount: number;
    payment_method: string;
    status: string;
    delivery_id: number | null;
}

export interface OrderPayload {
    body: Order;
    id: number | null;
}
