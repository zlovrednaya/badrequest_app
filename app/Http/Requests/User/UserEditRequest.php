<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserEditRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => 'integer|exists:notes,id',
            'email' => 'required|string',
            'phone' => 'string',
            'telegram_name' => 'string',
        ];
    }
}