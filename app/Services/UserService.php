<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserIntegration;
use App\Services\Integrations\Telegram\TelegramApi;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function __construct()
    {
        $this->userModel = new User();
    }

    protected function user(): User
    {
        $this->user = auth()->user();
        return $this->user;
    }

    public function update(array $data)
    {
        DB::beginTransaction();
        try {
            $user = User::where(['id'=>$this->user()->id])
            ->update($data);
            
            DB::commit();
            return $user;

        } catch(\Exception $e) {
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to update user',
                'description' => $e->getMessage()
            ];
        }
    }

    public function getReceiver(array $receiver)
    {
        $receiverDB = $this->userModel->integrations();
        if (!$receiverDB) {
            
        }
        
        return $receiverDB ?? [];
    }

    public function getUpdates(array $subscriber): array
    {
        $telegram = new TelegramApi();
        $r = $telegram->getUpdates();
        return $r;
    }

    public function syncTelegram(string $telegramName)
    {
        $telegram = new TelegramApi();
        $success = false;
        $error = null;
        $checkUpdates = $telegram->getUpdates();
        foreach($checkUpdates as $update) {
            $chat = $update['message']['chat'] ?? null;
            if(!$chat) {
                continue;
            }

            if($chat['username'] === $telegramName) {
                DB::beginTransaction();
                try {
                    UserIntegration::create([
                        'channel' => 'telegram',
                        'username' => $chat['id'],
                        'username_type' => 'chat_id',
                        'user_id' => $this->user()->id,
                    ]);

                    DB::commit();

                    $success = true;

                    break;
                } catch (\Exception $e) {
                    DB::rollback();
                    
                    $success = false;
                    $error = 'Unable to create new connection';
                }
            }
        }

        return [
            'success' => $success,
        ];

        
    }
}