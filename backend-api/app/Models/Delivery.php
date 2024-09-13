<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'deliver_name',
        'email',
        'address',
        'dil_date',
        'dilivered_by',
        'remark',
    ];

    // relationship

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
