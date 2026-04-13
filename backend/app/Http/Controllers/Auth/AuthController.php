<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Login2FARequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SendCodeRequest;
use App\Services\Auth\AuthService;
use App\Services\Auth\SecurityCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// Auth
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function createAccount(
        Request $request,
        AuthService $authService
    ): JsonResponse {
        $validated = $request ->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $authService->createAccount($validated);

        return response()->json([
            'status' => 201,
            'msg' => 'Cuenta creada exitosamente',
            'user' => $user,
        ], 201);
    }

    public function login(
        LoginRequest $request,
        AuthService $authService,
        SecurityCodeService $securityCodeService
    ): JsonResponse {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 400,
                'msg' => 'Contraseña incorrecta',
            ], 400);
        }

        $user = $request->user();

        $securityCode = $securityCodeService->createCode($user, 'two_factor_auth');

        $authService->sendEmail2FA($user, $securityCode);

        $abilities = ['2fa_required'];
        if ($request->boolean('remember')) {
            $abilities[] = 'remember_me';
        }

        $token = $user->createToken('login', $abilities, now()->addMinutes(15));

        return $authService->sendLoginResponse($user, $token->plainTextToken, $token->accessToken->abilities);
    }

    public function resendEmail(SendCodeRequest $request, SecurityCodeService $securityCodeService, AuthService $authService): JsonResponse
    {
        $user = $request->user();

        try {
            $securityCode = $securityCodeService->createCode($user, 'two_factor_auth');

            $authService->sendEmail2FA($user, $securityCode);

            return response()->json([
                'status' => 200,
                'msg' => 'Código de seguridad reenviado',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'msg' => 'Error al enviar el código de seguridad',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function loginWith2FA(Login2FARequest $request, AuthService $authService, SecurityCodeService $securityCodeService): JsonResponse
    {
        $user = $request->user();
        $apiKey = $user->currentAccessToken();
        $otp = $request->otp;

        if (!$securityCodeService->checkCode($user, $otp, 'two_factor_auth')) {
            return response()->json([
                'status' => 400,
                'msg' => 'Código de autenticación inválido o expirado',
                'errors' => ['otp' => ['Código de autenticación inválido o expirado']],
            ], 400);
        }

        $securityCodeService->invalidateCode($user, $otp, 'two_factor_auth');

        $abilities = $authService->getTokenAbilities($apiKey, $tfa = false);

        $minutes = (int) (in_array('remember_me', $abilities) ? config('sanctum.expiration') : 60 * 24);
        $token = $user->createToken('2fa', $abilities, now()->addMinutes($minutes));

        return $authService->sendLoginResponse($user, $token->plainTextToken, $token->accessToken->abilities);
    }

    public function relogin(Request $request, AuthService $authService): JsonResponse
    {
        $user = $request->user();
        $token = $user->currentAccessToken();

        $abilities = $authService->getTokenAbilities($token);

        return $authService->sendLoginResponse($user, null, $abilities);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response()->json([
            'status' => 200,
            'msg' => 'Sesión cerrada',
        ], 200);
    }

    public function logoutAll(Request $request): JsonResponse
    {
        $user = $request->user();

        $user->tokens()->delete();

        return response()->json([
            'status' => 200,
            'msg' => 'Sesiones cerrada',
        ], 200);
    }
}
