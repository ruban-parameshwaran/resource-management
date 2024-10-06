<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryResource extends JsonResource
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
            'deliver_name' => $this->deliver_name,
            'email' => $this->email,
            'address' => $this->address,
            'dil_date' => $this->dil_date,
            'dilivered_by' => $this->dilivered_by,
            'remark' => $this->remark,
            'orders' => OrderResource::collection($this->whenLoaded('orders'))
        ];
    }
}
