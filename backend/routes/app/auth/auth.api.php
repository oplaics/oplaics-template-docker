<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::post('/login', [AuthController::class, 'login'])
  ->name('auth.login');

// Route::post('/2fa', [AuthController::class, 'loginWith2FA'])
//   ->middleware('auth:sanctum')
//   ->name('auth.2fa');

// Route::post('/2fa/resend', [AuthController::class, 'resendEmail'])
//   ->middleware('auth:sanctum')
//   ->name('auth.2fa.resend');

// Route::post('/relogin', [AuthController::class, 'relogin'])
//   ->middleware('auth:sanctum')
//   ->name('auth.relogin');

// Route::get('/logout', [AuthController::class, 'logout'])
//   ->middleware('auth:sanctum')
//   ->name('auth.logout');

// Route::get('/logout-all', [AuthController::class, 'logoutAll'])
//   ->middleware('auth:sanctum')
//   ->name('auth.logout.all');