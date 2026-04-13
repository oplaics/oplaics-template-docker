<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SecurityCodeController;


Route::post('/security/email/send', [SecurityCodeController::class, 'emailSend'])
  ->name('security.email.send');

Route::post('/security/password/update', [SecurityCodeController::class, 'passwordUpdate'])
  ->name('security.password.update');