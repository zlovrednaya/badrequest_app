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
            'message' => $subscriber['message'],
        ]);
    }

    public function getUpdates(array $subscriber)
    {
        $notifier = NotificationFactory::create($subscriber['channel']);
        $r = $notifier->getUpdates();
    }
}