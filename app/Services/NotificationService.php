<?php

namespace App\Services;

use App\Notifications\NotificationFactory;

use App\Models\User;

class NotificationService 
{
    public function __construct() 
    {
    }

    public function sendMessage(array $subscriber): array
    {
        $notifier = NotificationFactory::create($subscriber['channel']);
        $result = $notifier->sendMessage([
            'receiver' => $subscriber['receiver'],
            'message' => $subscriber['message'],
        ]);

        return $result;
    }

}