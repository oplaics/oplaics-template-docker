<?php

namespace App\Console\Commands\Auth;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

#[Signature('app:clear-security-codes {--expired-months=8}')]
#[Description('Limpia los códigos de seguridad expirados de la base de datos')]
class ClearSecurityCodes extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $expiredMonths = (int) $this->option('expired-months');

        $this->info("Eliminando códigos de seguridad expirados hace más de {$expiredMonths} meses...");

        $deleted = DB::table('security_codes')
            ->where('created_at', '<', now()->subMonths($expiredMonths))
            ->delete();

        $this->info("Se han eliminado {$deleted} códigos de seguridad expirados.");

        return self::SUCCESS;
    }
}