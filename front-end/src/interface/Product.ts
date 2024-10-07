import { Category } from "./Category";

export interface ApiResponse {
    success: string;
    message: string;
    data: Product[];
    meta: Meta
} 

interface Meta{
    total: number;
    per_page: number;
}

export interface Product {
    product_code: string;
    name        : string;
    unit        : string;
    retail_price: number;
    whole_sale  : number;
    is_active   : boolean;
    category?   : Category;
    category_id? : number,
    updated_at?  : string;
    created_at? : string;
    id?          : number | null;
}

export interface ProductPayload {
    body: Product,
    id: number | null
}

export interface InitialValuesProducts {
    product_code: string
    name: string
    unit: string
    retail_price: number
    whole_sale: number
    is_active: boolean
    category_id: number
};