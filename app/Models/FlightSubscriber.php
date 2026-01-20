<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightSubscriber extends Model 
{
    protected $table = 'flights_subscribers';
    protected $fillable = [
        'flight_id', 
        'subscriber_id',
        'notification_status',
        'created_at', 
    ];
}