<?php

namespace Database\Factories;

use App\Models\Category as ModelsCategory;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
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
            'product_code' => $this->faker->unique()->numberBetween(1000, 9999),
            'name' => $this->faker->word,
            'unit' => $this->faker->randomElement(['400g', '1kg']),
            'retail_price' => $this->faker->randomFloat(2, 100, 500),
            'whole_sale' => $this->faker->randomFloat(2, 80, 450),
            'is_active' => $this->faker->boolean,
            'category_id' => ModelsCategory::factory(), 
        ];
    }
}
