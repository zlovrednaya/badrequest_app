<?php

namespace App\Services\Integrations\Telegram;
use Illuminate\Support\Facades\Log;


class TelegramApi {

    private $botUrl = 'https://api.telegram.org/bot';

    private $allowedMethods = [
        'message',
        'message_reaction',
        'message_reaction_count',
        'edited_channel_post',
        'callback_query'
    ];
    public function __construct()
    {
        $this->apiKey = config('services.telegram.token');   
    }

    public function request($method, $httpMethod = 'POST', $data = false)
    {
        $url = $this->botUrl. $this->apiKey . '/' . $method;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        if($httpMethod == 'POST') {
            curl_setopt($ch, CURLOPT_POST, TRUE);
            if($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            }  
        }

        $res = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $decoded = json_decode($res, true);

        if ($method === 'sendMessage') {
            Log::info('httpcode: ' . $httpCode);
            Log::info($res);
        }
        return $decoded;
    }

    public function getSubscriber()
    {
        
    }
    public function getUpdates()
    {
        $data = [
            'allowed_updates' => json_encode($this->allowedMethods)
        ];

        $request = $this->request('getUpdates', 'POST', $data);
        return $request['result'] ?? [];
    }

    public function getMessage(int $id)
    {
        $data = [
            'id' => $id,
        ];
         $request = $this->request('messages.getMessages', 'POST', $data);
        return $request['result'] ?? [];
    }
}