<?php

namespace App\Services;

use App\Models\Delivery;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class DeliveryService
{
    /**
     * Create a new delivery.
     *
     * @param  array  $data
     * @return \App\Models\Delivery
     */
    public function createDelivery(array $data): Delivery
    {
        return Delivery::create($data);
    }

    /**
     * Get all deliveries.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllDeliveries(): LengthAwarePaginator
    {
        return Delivery::with('orders')
            ->orderBy('id','desc')->paginate(10);
    }

    /**
     * Get a delivery by ID.
     *
     * @param  int  $id
     * @return \App\Models\Delivery
     */
    public function getDeliveryById(int $id): Delivery
    {
        return Delivery::with('orders')->findOrFail($id);
    }

    public function updateDelivery(Delivery $delivery, array $data)
    {
        return $delivery->update($data);
    }

    public function deleteDelivery(Delivery $delivery)
    {
        return $delivery->delete();
    }

}
