export interface ApiResponse {
  success: string;
  message: string;
  data: Customer[];
} 

export interface Customer {
  id?: number,
  name: string,
  contact: string,
  address: string,
  email: string,
  orders: []
}


export interface CustomerPayload {
  name: string,
  contact: string,
  address: string,
  email: string,
}