<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
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
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Correo no válido.',
            'email.exists' => 'Correo no válido.',

            'otp.required' => 'El código OTP es obligatorio.',
            'otp.string' => 'El código OTP debe ser un texto válido.',

            'new_password.required' => 'La nueva contraseña es obligatoria.',
            'new_password.string' => 'La nueva contraseña debe ser un texto válido.',
            'new_password.min' => 'La nueva contraseña debe tener al menos :min caracteres.',
            'new_password.confirmed' => 'La confirmación de la contraseña no coincide.',
        ];
    }
}