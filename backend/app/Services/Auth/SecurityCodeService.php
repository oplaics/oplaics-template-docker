<?php

namespace App\Services\Auth;

use App\Mail\Auth\SecurityCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Mail;

class SecurityCodeService
{
  public static function generateToken(int $length = 6, int $maxAttempts = 10): string
  {
    $chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // excluye I, L, O, 0, 1
    $charsLen = strlen($chars);

    for ($attempt = 0; $attempt < $maxAttempts; $attempt++) {
      $token = '';
      for ($i = 0; $i < $length; $i++) {
        $token .= $chars[random_int(0, $charsLen - 1)];
      }

      if (!SecurityCode::query()->where('token', $token)->exists()) {
        return $token;
      }
    }

    throw new \RuntimeException('No se pudo generar un token único tras ' . $maxAttempts . ' intentos.');
  }

  public function createCode(User $user, string $type, $length = 6, int $maxAttempts = 10, int $ttlMinutes = 15)
  {
    $attempt = 0;

    do {
      $validate = $this->validateCode($user, $type);

      // Verificar si ya existe un código válido
      if ($validate) {
        return SecurityCode::where('user_id', $user->id)
          ->where('type', $type)->whereNull('used_at')->first();
      }

      $token = static::generateToken($length);

      try {
        return $user->securityCodes()->create([
          'token' => $token,
          'type' => $type,
          'expire_at' => now()->addMinutes($ttlMinutes),
        ]);
      } catch (QueryException $e) {
        $attempt++;
        if ($attempt >= $maxAttempts) {
          throw new \RuntimeException("No se pudo generar un token único tras {$maxAttempts} intentos.", 0, $e);
        }
        // continuar para generar un nuevo token y reintentar
      }
    } while ($attempt < $maxAttempts);

    throw new \RuntimeException("No se pudo generar un token único tras {$maxAttempts} intentos.");
  }

  public function sendEmail(User $user, SecurityCode $securityCode)
  {
    $code = $securityCode->token;
    $expireAt = $securityCode->expire_at->diffForHumans();
    
    Mail::to($user->email)->queue((new SecurityCodeMail($code, $expireAt)));
  }

  public function checkCode(User $user, string $code, string $type): bool
  {
    $securityCode = $user->securityCodes()
      ->where('token', $code)
      ->where('type', $type)
      ->whereNull('used_at')
      ->first();

    if ($securityCode === null) {
      return false;
    }

    if ($securityCode->expire_at < now()) {
      $securityCode->delete();
      return false;
    }

    return true;
  }

  public function validateCode(User $user, string $type): bool
  {
    $securityCode = $user->securityCodes()
      ->where('type', $type)
      ->whereNull('used_at')
      ->first();

    if ($securityCode === null) {
      return false;
    }

    if ($securityCode->expire_at < now()->addMinutes(2)) {
      $securityCode->delete();
      return false;
    }

    return $securityCode !== null;
  }

  public function invalidateCode(User $user, string $code, string $type): void
  {
    $securityCode = $user->securityCodes()
      ->where('token', $code)
      ->where('type', $type)
      ->whereNull('used_at')
      ->first();

    $securityCode->used_at = now();
    $securityCode->save();
  }
}