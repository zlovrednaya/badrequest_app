<?php

namespace App\Services\Integrations\Telegram;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\Integrations\Telegram\TelegramApi;
use App\Services\ChoreService;

use App\Models\TelegramMessage;
use App\Models\User;

class TelegramUpdateService
{
    private const REACTIONS_DONE_MAP = [
        '🔥',
        '👍',
    ];

    public function processUpdates(array $updates): void
    {
        if(empty($updates)) return;
        Log::info('new update');
        Log::info($updates);

        foreach($updates as $update){
            if(empty($update['message_id'])) continue;

            Log::info('message_id' . $update['message_id']);

            //$choreService = new ChoreService();
            //$choreService->updateChore($update['message_id']);

            $this->updateTelegramMessage($update);
        }
    }

    public function createTelegramMessage(array $createdService, array $chore): void
    { 
        if(empty($createdService['result']['message_id'])) return;  
        $data['user_id'] = $this->user()->id;
        DB::beginTransaction();
        try {
            $data = [
                'user_id' => $chore['user_id'],
                'note_id' => $chore['id'], 
                'message_id' => $createdService['result']['message_id'],
            ];

            Log::info($data);
            TelegramMessage::create($data);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        }
    }

    /**
     * true - done 
     * false - updone
     */
    public function getReactionValue($reaction): bool
    {
        if(!$reaction) return false;
        Log::info('reactiondata');
        Log::info($reaction);

        return in_array($reaction, self::REACTIONS_DONE_MAP, true);
    }
    public function updateTelegramMessage($updateData) {

        $reaction = $updateData['new_reaction'][0]['emoji'] ?? null; 
        Log::info('resction' , $reaction .  $this->getReactionValue($reaction));
        DB::beginTransaction();
        try {
            $chore = TelegramMessage::where(['message_id'=>$updateData['message_id']])
                ->update([
                    'done' => $this->getReactionValue($reaction),
                    'reaction' => $reaction, 
                ]);
            DB::commit();
            return $chore;
        } catch(\Exception $e) {
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to update message',
                'description' => $e->getMessage()
            ];
        }
    }
}