<?php

namespace Database\Factories;

use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class DeliveryFactory extends Factory
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
            'deliver_name' => $faker->company,
            'email' => $faker->companyEmail,
            'address' => $faker->address,
            'dil_date' => $faker->date(),
            'dilivered_by' => $faker->name,
            'remark' => $faker->sentence,
        ];
    }
}
