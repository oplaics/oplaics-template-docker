<?php

// Models

use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;

// Sanctum
use Laravel\Sanctum\Sanctum;

// Refresh Database
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;

uses(RefreshDatabase::class);

test('Login via credenciales', function () {
    // $this->withoutExceptionHandling();
    $user = User::factory()->create([
        'password' => 'testing',
    ]);

    Mail::fake();

    $response = $this->postJson(route('auth.login'), [
        'email' => $user->email,
        'password' => 'testing',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'apiKey',
            'token_can',
            'msg',
            'user',
            'permissions',
            'roles',
            'unreads',
        ]);

    Mail::assertQueued(TfaCodeMail::class, 1);
});