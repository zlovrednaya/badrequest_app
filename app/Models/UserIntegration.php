<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
 
class UserIntegration extends Model
{
    protected $fillable = [
        'channel',
        'user_id',
        'username',
        'username_type',
    ];
}