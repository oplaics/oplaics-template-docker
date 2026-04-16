<?php

use Illuminate\Support\Facades\Route;

/**
 * API OSYS v1
 */
Route::prefix('v1')->group(function () {
    /**
   * Auth API
   */
  Route::prefix('auth')->group(function () {
    /**
     * Auth API
     */
    require __DIR__ . '/app/auth/auth.api.php';

    /**
     * Security Code API
     */
    require __DIR__ . '/app/auth/security_code.api.php';
  });
});