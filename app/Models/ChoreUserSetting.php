<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class ChoreUserSetting extends Model
{
    protected $table = 'notes_user_settings';
    protected $casts = [
        'settings' => 'array',
    ];
    protected $fillable = [
        'settings',
        'user_id',
    ];
}