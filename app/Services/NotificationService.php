<?php

namespace App\Services;

use App\Notifications\NotificationFactory;

use App\Models\User;

class NotificationService 
{
    public function __construct() 
    {
    }

    public function sendMessage(array $subscriber): void
    {
        $notifier = NotificationFactory::create($subscriber['channel']);
        $notifier->sendMessage([
            'receiver' => $subscriber['receiver'],
            'message' => $subscriber['message'],
        ]);
    }

}