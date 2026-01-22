<?php

namespace App\Services;

use App\Notifications\NotificationFactory;

class NotificationService 
{
    public function __construct() 
    {
    }

    public function sendMessage(array $subscriber)
    {
        $notifier = NotificationFactory::create($subscriber['channel']);
        $notifier->sendMessage([
            'receiver' => $subscriber['receiver'],
        ]);
    }
}