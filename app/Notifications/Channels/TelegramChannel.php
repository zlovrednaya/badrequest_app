<?php

namespace App\Notifications\Channels;

use Illuminate\Support\Facades\Log;
use App\Notifications\AbstractNotification;

class TelegramChannel extends AbstractNotification
{
    private $botUrl = 'https://api.telegram.org/bot';
    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
    }
    
    public function request(string $method, array $data): array
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

        Log::info('httpcode: ' . $httpCode);
        Log::info($res);

        $decoded = json_decode($res, true);

        return $decoded ?? [];
    }

    public function sendMessage(array $sendData): array
    {
        $method = 'sendMessage';
        
        $data = [
            'message' => $sendData['message'],
            'text' => $sendData['message'],
            $sendData['receiver']['username_type'] => $sendData['receiver']['username'],
            "parse_mode"=> "HTML",
        ];

        $res = $this->request($method, $data);

        return $res;
       
    }
}