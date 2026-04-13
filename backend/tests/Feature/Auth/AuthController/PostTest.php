<?php

// Models

use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;

// Sanctum
use Laravel\Sanctum\Sanctum;

use Illuminate\Support\Facades\Mail;

test('[POST] usuario puede crear una cuenta', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'Test User',
        'email' => 'testing@testing.com',
        'password' => 'testings',
        'password_confirmation' => 'testings',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'status',
            'msg',
            'user' => [
                'id',
                'name',
                'email',
            ],
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'testing@testing.com',
    ]);
    dd(User::count());
});

test('[POST] usuario no puede crear una cuenta con datos inválidos', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => '',
        'email' => 'invalid-email',
        'password' => 'short',
        'password_confirmation' => 'short',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'password']);
});

test('[POST] usuario puede logearse', function () {
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

test('[POST] usuario puede reenviar código de verificación por correo electrónico', function () {
    Mail::fake();

    $user = User::factory()->create();
    Sanctum::actingAs(
        $user,
        ['2fa_required']
    );

    $response = $this->postJson(route('auth.2fa.resend'), [
        'email' => $user->email,
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);

    Mail::assertQueued(TfaCodeMail::class, 1);
});

test('[POST] usuario no puede reenviar código de verificación por correo electrónico si ocurre un error', function () {
    Mail::fake();

    $user = User::factory()->create();
    Sanctum::actingAs(
        $user,
        ['2fa_required']
    );

    // Simular un error al enviar el correo
    Mail::shouldReceive('to->queue')
        ->once()
        ->andThrow(new \Exception('Error al enviar el correo'));

    $response = $this->postJson(route('auth.2fa.resend'), [
        'email' => $user->email,
    ]);

    $response->assertStatus(500)
        ->assertJsonStructure([
            'status',
            'msg',
            'error',
        ]);
});

test('[POST] usuario puede verificar el código de doble factor', function () {
    $securityCode = SecurityCode::factory()->create([
        'type' => 'two_factor_auth',
    ]);
    $user = $securityCode->user;

    Sanctum::actingAs(
        $user,
        ['2fa_required', 'remember_me']
    );

    $response = $this->postJson(route('auth.2fa'), [
        'otp' => $securityCode->token,
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
});

test('[POST] usuario no puede verificar el código de doble factor con un código incorrecto', function () {
    $securityCode = SecurityCode::factory()->create([
        'type' => 'two_factor_auth',
    ]);
    $user = $securityCode->user;

    Sanctum::actingAs(
        $user,
        ['2fa_required', 'remember_me']
    );

    $response = $this->postJson(route('auth.2fa'), [
        'otp' => '123456', // Código incorrecto
    ]);

    $response->assertStatus(400)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);
});

test('[POST] usuario no puede verificar el código de doble factor con un código expirado', function () {
    $securityCode = SecurityCode::factory()->create([
        'type' => 'two_factor_auth',
        'expire_at' => now()->subMinutes(1), // Código expirado
    ]);
    $user = $securityCode->user;

    Sanctum::actingAs(
        $user,
        ['2fa_required', 'remember_me']
    );

    $response = $this->postJson(route('auth.2fa'), [
        'otp' => $securityCode->token,
    ]);

    $response->assertStatus(400)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);
});

test('[POST] usuario puede hacer relogin con token valido', function () {
    Sanctum::actingAs(
        User::factory()->create(),
        ['2fa_required']
    );

    $response = $this->postJson(route('auth.relogin'));

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
            'user',
            'token_can',
            'permissions',
            'roles',
            'unreads',
        ]);
});