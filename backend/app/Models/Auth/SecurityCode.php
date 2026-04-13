<?php

namespace App\Models\Auth;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityCode extends Model
{
    /** @use HasFactory<\Database\Factories\Auth\SecurityCodeFactory> */
    use HasFactory;

    const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'token',
        'type',
        'used_at',
        'expire_at',
    ];

    protected function casts(): array
    {
        return [
            'expire_at' => 'datetime',
            'used_at' => 'datetime',
        ];
    }

    /**
     * Relaciones
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}