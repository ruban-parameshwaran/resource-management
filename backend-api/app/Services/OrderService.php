<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderService
{   
    /**
     * Create a new order.
     *
     * @param  array  $data
     * @return \App\Models\Order
     */
    public function createOrder(array $data): Order
    {
        return Order::create($data);
    }

    /**
     * Get all orders.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllOrders()
    {
        return Order::with(['customer', 'delivery'])->get();
    }

    /**
     * Get an order by ID.
     *
     * @param  int  $id
     * @return \App\Models\Order
     */
    public function getOrderById(int $id): Order
    {
        $order = Order::with(['customer', 'delivery'])->find($id);

        if (!$order) {
            throw new ModelNotFoundException("There is no order found...!");
        }

        return $order;
    }

    public function deleteOrder(Order $order)
    {
        return $order->delete();
    }

    public function updateOrder(Order $order, array $data)
    {
        return $order->update($data);
    }
}

