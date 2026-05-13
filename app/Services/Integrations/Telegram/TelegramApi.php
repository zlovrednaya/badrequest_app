<?php

namespace App\Services\Integrations\Telegram;

class TelegramApi {

    private $botUrl = 'https://api.telegram.org/bot';

    public function __construct()
    {
        $this->apiKey = config('services.telegram.token');   
    }

    public function getSubscriber()
    {
        
    }
    public function getUpdates()
    {
        $url = $this->botUrl. $this->apiKey . '/getUpdates';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        
        $res = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $decoded = json_decode($res ,true);
        return $decoded['result'] ?? [];
        
    }
}