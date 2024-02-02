<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Author>
 */
class AuthorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name(),
            "gender" => fake()->randomElement(["Male", "Female"]),
            "age" => fake()->numberBetween(12,100),
            "country" => fake()->randomElement(["Kenya", "Cananda", "USA", "Japan", "India", "France", "Italy"]),
            "genre" => fake()->randomElement(["Romance novel", "Fiction", "Scientific", "Narrative"])
        ];
    }
}
