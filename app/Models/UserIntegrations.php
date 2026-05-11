<?php
use App\Models;
use Illuminate\Database\Eloquent\Model;
 
class UserIntegrations extends Model
{
    protected $fillable = [
        'channel',
        'user_id',
        'username',
        'username_type',
    ];
}