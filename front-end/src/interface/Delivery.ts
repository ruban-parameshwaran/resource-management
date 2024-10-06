export interface ApiResponse {
  success: string;
  message: string;
  data: Delivery[];
}

export interface Delivery {
  id?: number |  null;
  deliver_name: string;
  email: string;
  address: string;
  dil_date: string,
  dilivered_by: string;
  remark: string,
  orders?: []
}

export interface DeliveryPayload {
  body: Delivery;
  id: number | null;
}

