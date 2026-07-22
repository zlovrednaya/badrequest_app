<?php

namespace App\Notifications;

use App\Notifications\Channels\EmailChannel;
use App\Notifications\Channels\TelegramChannel;

class NotificationFactory
{
    public static function create(string $channel)
    {
        return match(strtolower($channel)) {
            'email' => new EmailChannel(config('services.mailersend.token')),
            'telegram' => new TelegramChannel(config('services.telegram.token')),
        };
    }
}