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
    
    public function getSubscriber()
    {
        
    }
    public function getUpdates()
    {
        $url = $this->botUrl. $this->apiKey . '/getUpdates';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, TRUE);
        $res = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        echo print_r([$res,$httpCode]);
        
    }
    public function sendMessage(array $sendData):void
    {

    }
}