<?php

namespace App\Notifications\Channels;

use App\Notifications\AbstractNotification;

class TelegramChannel extends AbstractNotification
{
    private $botUrl = 'https://api.telegram.org/bot';
    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
    }
    
    public function sendMessage(array $sendData):void
    {

    }
}