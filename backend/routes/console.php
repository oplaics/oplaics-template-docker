<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('queue:listen --tries=3 --queue=high,commands,events,default,emails')
    ->environments(['local'])
    ->runInBackground()
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/queue_listen.log'));

Schedule::command('sanctum:prune-expired-tokens')
    ->daily()
    ->runInBackground()
    ->appendOutputTo(storage_path('logs/sanctum_prune.log'));

Schedule::command('app:clear-security-codes --expired-months=8')
    ->monthly()
    ->runInBackground()
    ->appendOutputTo(storage_path('logs/clear_security_codes.log'));