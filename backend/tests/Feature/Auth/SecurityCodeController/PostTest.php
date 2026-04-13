<?php

use App\Mail\Auth\SecurityCodeMail;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use App\Models\Auth\SecurityCode;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;

uses(RefreshDatabase::class);

test('[POST] usuario puede enviar código de recuperación', function () {
    // $this->withoutExceptionHandling();
    $user = User::factory()->create();

    Queue::fake();
    Mail::fake();

    $response = $this->postJson(route('security.email.send'), [
        'email' => $user->email,
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);

    Mail::assertQueued(function (SecurityCodeMail $mail) use ($user) {
        return $mail->hasTo($user->email);
    });
});

test('[POST] usuario puede reenviar código de recuperación', function () {
    $user = User::factory()->create();

    Mail::fake();

    // Primer envío
    $response1 = $this->postJson(route('security.email.send'), [
        'email' => $user->email,
    ]);

    $response1->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);

    $securityCode = SecurityCode::where('user_id', $user->id)
        ->where('type', 'password_reset')
        ->first();

    // Segundo envío
    $response2 = $this->postJson(route('security.email.send'), [
        'email' => $user->email,
    ]);

    $response2->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);

    // Verificar que se enviaron dos correos
    Mail::assertQueued(SecurityCodeMail::class, 2);

    $this->assertDatabaseHas('security_codes', [
        'id' => $securityCode->id,
    ]);

    $this->assertDatabaseHas('security_codes', [
        'user_id' => $user->id,
        'token' => $securityCode->token,
        'type' => 'password_reset',
    ]);

    // Verificar que se reenvió el mismo código
    $this->assertDatabaseCount('security_codes', 1);
});

test('[POST] usuario no puede enviar código de recuperación si ocurre un error', function () {
    $user = User::factory()->create();
    Mail::fake();

    // Simular un error al enviar el correo
    Mail::shouldReceive('to->queue')
        ->once()
        ->andThrow(new \Exception('Error al enviar el correo'));

    $response = $this->postJson(route('security.email.send'), [
        'email' => $user->email,
    ]);

    $response->assertStatus(500)
        ->assertJsonStructure([
            'status',
            'msg',
            'error',
        ]);
});

test('[POST] usuario puede cambiar contraseña', function () {
    $securityCode = SecurityCode::factory()->create([
        'type' => 'password_reset',
    ]);
    $user = $securityCode->user;

    $response = $this->postJson(route('security.password.update'), [
        'email' => $user->email,
        'otp' => $securityCode->token,
        'new_password' => 'newpassword',
        'new_password_confirmation' => 'newpassword',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'msg',
        ]);

    $this->assertTrue(Hash::check('newpassword', $user->fresh()->password), 
        'La contraseña no fue actualizada correctamente.'
    );

    $usedCode = $securityCode->fresh();

    $this->assertTrue(
        !is_null(SecurityCode::where('id', $usedCode->id)->value('used_at')),
        'El código de seguridad no fue marcado como usado.'
    );
});

test('[POST] usuario no puede cambiar contraseña con código inválido', function () {
    $securityCode = SecurityCode::factory()->create([
        'type' => 'password_reset',
    ]);
    $user = $securityCode->user;

    $response = $this->postJson(route('security.password.update'), [
        'email' => $user->email,
        'otp' => 'invalid_code',
        'new_password' => 'newpassword',
        'new_password_confirmation' => 'newpassword',
    ]);

    $response->assertStatus(422)
        ->assertJsonStructure([
            'status',
            'msg',
            'errors' => ['otp'],
        ]);

    $this->assertFalse(Hash::check('newpassword', $user->fresh()->password), 
        'La contraseña fue actualizada con un código inválido.'
    );
});
