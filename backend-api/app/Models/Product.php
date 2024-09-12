<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_code', 
        'name', 
        'unit', 
        'retail_price', 
        'whole_sale', 
        'is_active'
    ];
}
