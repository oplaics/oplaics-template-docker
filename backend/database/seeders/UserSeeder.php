<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'owner@example.com'],
            ['name' => 'Owner', 'password' => 'password']
        );

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin', 'password' => 'password']
        );

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            ['name' => 'User', 'password' => 'password']
        );
    }
}
