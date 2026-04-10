<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class Login2FARequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'otp' => ['required', 'string', 'size:6'],
        ];
    }

    /**
     * Messages
     */
    public function messages(): array
    {
        return [
            'otp.required' => 'El código de seguridad es obligatorio.',
            'otp.string' => 'El código de seguridad debe ser una cadena de texto.',
            'otp.size' => 'El código de seguridad debe tener exactamente 6 caracteres.',
        ];
    }
}