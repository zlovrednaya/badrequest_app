<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = [
        'flight_number', 
        'status', 
        'created_at', 
        'flight_date',
    ];
}