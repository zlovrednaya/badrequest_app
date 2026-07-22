<?php

namespace App\Http\Requests\Chore;

use Illuminate\Foundation\Http\FormRequest;

class ChoreBulkRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'ids.*' => 'integer|exists:notes,id',
        ];
    }
}