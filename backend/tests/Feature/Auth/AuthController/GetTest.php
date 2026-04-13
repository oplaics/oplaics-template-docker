<?php

// Refresh Database
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

test('[GET] usuario puede cerrar sesión', function () {
    // $this->withoutExceptionHandling();
    Sanctum::actingAs(
        User::factory()->create(),
        []
    );

    $response = $this->getJson(route('auth.logout'));

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);
});

test('[GET] usuario puede cerrar sesión en todos los dispositivos', function () {
    // $this->withoutExceptionHandling();
    Sanctum::actingAs(
        User::factory()->create(),
        []
    );

    $response = $this->getJson(route('auth.logout.all'));

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);
});

test('[GET] usuario no puede cerrar sesión sin autenticación', function () {
    $response = $this->getJson(route('auth.logout'));

    $response->assertStatus(401);
});

test('[GET] usuario no puede cerrar sesión en todos los dispositivos sin autenticación', function () {
    $response = $this->getJson(route('auth.logout.all'));

    $response->assertStatus(401);
});

test('[GET] usuario no puede cerrar sesión con token inválido', function () {
    $response = $this->withHeaders([
        'Authorization' => 'Bearer invalid_token',
    ])->getJson(route('auth.logout'));

    $response->assertStatus(401);
});