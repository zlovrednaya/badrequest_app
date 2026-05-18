<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class TelegramMessage extends Model
{
    protected $fillable = [
        'note_id',
        'user_id',
        'message_id',
    ];
}