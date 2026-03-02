<?php

namespace App\Notifications;

use App\Notifications\Channels\EmailChannel;

class NotificationFactory
{
    public static function create(string $channel)
    {
        return match(strtolower($channel)) {
            'email' => new EmailChannel(config('services.mailersend.token')),
        };
    }
}