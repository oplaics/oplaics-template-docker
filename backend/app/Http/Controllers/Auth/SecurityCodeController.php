<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendCodeRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Models\User;
use App\Services\Auth\SecurityCodeService;

class SecurityCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function emailSend(SendCodeRequest $request, SecurityCodeService $securityCodeService)
    {
        $user = User::where('email', $request->email)->first();

        try {
            $securityCode = $securityCodeService->createCode($user, 'password_reset');
            
            $securityCodeService->sendEmail($user, $securityCode);

            return response()->json([
                'status' => 200,
                'msg' => 'Código de seguridad enviado',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'msg' => 'Error al enviar el código de seguridad',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function passwordUpdate(UpdatePasswordRequest $request, SecurityCodeService $securityCodeService)
    {
        $user = User::where('email', $request->email)->first();
        $code = $request->otp;

        try {
            $isValid = $securityCodeService->checkCode($user, $code, 'password_reset');

            if (!$isValid) {
                return response()->json([
                    'status' => 422,
                    'msg' => 'Código de seguridad inválido o expirado',
                    'errors' => ['otp' => ['Código de seguridad inválido o expirado']],
                ], 422);
            }

            $user->password = $request->new_password;
            $user->save();

            $securityCodeService->invalidateCode($user, $code, 'password_reset');

            return response()->json([
                'status' => 200,
                'msg' => 'Contraseña actualizada correctamente',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'msg' => 'Error al actualizar la contraseña',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}