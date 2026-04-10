<?php

namespace Database\Factories\Auth;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Auth\SecurityCode>
 */
class SecurityCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'token' => $this->faker->unique()->regexify('[0-9]{6}'),
            'type' => $this->faker->randomElement(['password_reset', 'two_factor_auth']),
            'expire_at' => now()->addMinutes(15),
        ];
    }
}