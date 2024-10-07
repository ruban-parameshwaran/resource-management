<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Delivery;
use App\Models\Product;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create User
        User::factory()->create([
            'first_name'    => 'John',
            'last_name'     => 'Doe',
            'email'         => 'john@mail.com',
            'password'      => bcrypt('password'),
            'user_type'     => 'Admin',
            'created_at'    => now()
        ]);
        
       
        // Create categories
        Category::factory(10)->create();

        // Create products and associate them with categories
        Product::factory(100)->create();

        // Create customers
        Customer::factory(10)->create();

        // Create deliveries
        Delivery::factory(10)->create();

        // Create orders and associate them with customers and deliveries
        Order::factory(20)->create();
    }
}
