<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class Chore extends Model
{
    protected $table = 'notes';
    protected $fillable = [
        'title',
        'text',
        'category',
        'cost',
        'due_datetime',
        'color',
        'drawing',
        'user_id',
        'deleted',
        'istodo'
    ];

    protected static function booted()
    {

        static::addGlobalScope('deleted', function ($query ) {
            $userId = auth()->user()->id;

            $query->where('deleted', false);
            $query->where('user_id', $userId);
        });
    }
}