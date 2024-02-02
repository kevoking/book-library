<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_making_a_post_api_request(): void
    {
        $response = $this->postJson(
            '/api/v1/authors',
            [
                "name" => "kevin mwangi",
                "gender" => "male",
                "age" => 37,
                "country" => "Kenya",
                "genre" => "Romance novel"
            ]
        );

        $response
            ->assertStatus(201);
    }

    public function test_making_a_get_api_request(): void
    {
        $response = $this->get(
            '/api/v1/books'
        );

        $response->assertStatus(200);
    }
}
