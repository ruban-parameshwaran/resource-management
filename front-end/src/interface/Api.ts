import { Category } from "./Category";

export interface ApiResponse {
    success: string;
    message: string;
    data: Category[];
    meta: Meta
}

interface Meta{
    total: number;
    per_page: number;
}
