<?php

namespace Database\Factories;

use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = Author::pluck('id')->toArray();

        return [
            "name" => fake()->text(15),
            "isbn" => fake()->regexify('[A-Z0-9]{12}'),
            "author_id" => fake()->randomElement($users),
        ];
    }
}
