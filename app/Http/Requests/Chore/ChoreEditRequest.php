<?php

namespace App\Http\Requests\Chore;

use Illuminate\Foundation\Http\FormRequest;

class ChoreEditRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'integer|exists:notes,id',
        ];
    }
}