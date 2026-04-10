<?php

namespace App\Services\Auth;

use App\Mail\Auth\TfaCodeMail;
use App\Models\Auth\SecurityCode;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\NewAccessToken;

class AuthService
{
  public function sendLoginResponse(User $user, ?string $token = null, ?array $abilities = null)
  {
    $user->makeVisible(['id']);

    $response = [
      'status' => 200,
      'msg' => 'Inicio de sesión',
      'user' => $user,
      'token_can' => [],
      'permissions' => $this->formatPerm($user),
      'roles' => $this->roles($user),
      'unreads' => $user->unreadNotifications->count(),
    ];

    if ($token) $response['apiKey'] = $token;
    if ($abilities) $response['token_can'] = $abilities;

    return response()->json($response, 200);
  }

  public function getTokenAbilities($token, $tfa = true): array
  {
    $abilities = [];

    if ($token->can('2fa_required') && $tfa) $abilities[] = '2fa_required';
    if ($token->can('remember_me')) $abilities[] = 'remember_me';

    return $abilities;
  }

  public function sendEmail2FA(User $user, SecurityCode $securityCode)
  {
    $code = $securityCode->token;
    $expireAt = $securityCode->expire_at->diffForHumans();
    
    Mail::to($user->email)->queue((new TfaCodeMail($code, $expireAt)));
  }

  public function formatPerm(User $user)
  {
    $permissions = $user->getAllPermissions()->toArray();
    $format = [];

    foreach ($permissions as $perm) {
      $format[$perm['name']] = true;
    }

    return $format;
  }

  public function roles(User $user)
  {
    if ($user->hasRole('owner')) {
      $roles = \Spatie\Permission\Models\Role::all()->pluck('name')->toArray();
    } else {
      $roles = $user->getRoleNames()->toArray();
    }

    return $roles;
  }
}