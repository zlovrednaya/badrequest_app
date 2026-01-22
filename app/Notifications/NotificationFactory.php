<?php

namespace App\Notifications;

use App\Notifications\Channels;

class NotificationFactory
{
    public static function create(string $channel)
    {
        return match(strtolover($channel)) {
            'email' => new EmailChannel(),
        };
    }
}