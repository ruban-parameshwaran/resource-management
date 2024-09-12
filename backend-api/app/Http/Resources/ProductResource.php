<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'product_code' => $this->product_code,
            'name' => $this->name,
            'unit' => $this->unit,
            'retail_price' => $this->retail_price,
            'whole_sale' => $this->whole_sale,
            'is_active' => $this->is_active,
            'category' => new CategoryResource($this->whenLoaded('category')), 
        ];
    }
}
