<?php

namespace Database\Factories;

use App\Models\Customer;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = Faker::create();
        return [
            'order_num' => $faker->unique()->numerify('ORD-#####'),
            'customer_id' => Customer::inRandomOrder()->first()->id,
            'order_date' => $faker->date(),
            'order_amount' => $faker->randomFloat(2, 50, 1000),
            'order_description' => $faker->sentence,
            'delivery_id' => null,
            'payment_method' => $faker->randomElement(['cod', 'card', 'onlinetransfer']),
            'status' => $faker->randomElement(['open', 'processing', 'delivered', 'rejected', 'cancel']),
        ];
    }
}
