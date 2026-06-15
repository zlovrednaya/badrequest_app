<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class ChoreBatch extends Model
{
    protected $table = 'notes_batches';
    protected $casts = [      
        'note_ids' => 'array',
    ];
    protected $fillable = [
        'note_ids',
        'user_id',
    ];
}