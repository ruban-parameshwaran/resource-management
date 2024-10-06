<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "order_num",
        "customer_id",
        "order_date",
        "order_amount",
        "payment_method",
        "status",
        "delivery_id"
    ];


    /**
     * The customer that owns the order.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * The products that belong to the order.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'price');
    }

    /**
     * The deliveries related to the order.
     */
    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }
}
