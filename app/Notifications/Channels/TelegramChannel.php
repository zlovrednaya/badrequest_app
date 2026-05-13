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
    
    public function request(string $method, array $data)
    {
        $url = $this->botUrl. $this->apiKey . '/' . $method;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
        $res = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        echo print_r([$url, $res, $httpCode]);
        return [$res, $httpCode];
    }

    public function sendMessage(array $sendData): void
    {
        $method = 'sendMessage';
        
        $data = [
            'message' => $sendData['message'],
            'text' => $sendData['message'],
            $sendData['receiver']['username_type'] => $sendData['receiver']['username'],
            "parse_mode"=> "HTML",
        ];

        $this->request($method, $data);
       
    }
}