<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_num' => $this->order_num,
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'order_date' => $this->order_date,
            'order_amount' => $this->order_amount,
            'order_description' => $this->order_description,
            'delivery' => new DeliveryResource($this->whenLoaded('delivery')),
            'payment_method' => $this->payment_method,
            'status' => $this->status,
        ];
    }
}
