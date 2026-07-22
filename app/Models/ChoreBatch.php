<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class ChoreBatch extends Model
{
    protected $table = 'notes_batches';
    protected $casts = [      
        'note_ids' => 'array',
        'batch_name' => 'string',
    ];
    protected $fillable = [
        'note_ids',
        'user_id',
        'batch_name',
    ];

    protected static function booted() {
        static::addGlobalScope(
            'user', function ($query) {
                if (auth()->check()) {
                    $query->where('user_id', auth()->id());
                }
            }
        );
    }
}