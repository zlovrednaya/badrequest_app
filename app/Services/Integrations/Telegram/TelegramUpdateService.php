<?php

namespace App\Services\Integrations\Telegram;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\Integrations\Telegram\TelegramApi;

use App\Models\TelegramMessage;
use App\Models\Chore;

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
    public function updateTelegramMessage(array $updateData) {

        $reaction = $updateData['new_reaction'][0]['emoji'] ?? null; 
        
        $isDone = $this->getReactionValue($reaction);

        DB::beginTransaction();
        try {
            $messageObj = TelegramMessage::where(['message_id' => $updateData['message_id']]);
            $messageData = $messageObj->first()->toArray();

            if(empty($messageData)) return;

            $messageObj->update([
                'done' => $isDone,
                'reaction' => $reaction, 
            ]);

            $choreObj = Chore::where(['id' => $messageData['note_id']]);
        
            Chore::where(['id' => $messageData['note_id']])
            ->update([
                'done' => $isDone,
            ]);

            DB::commit();

            return [
                'success' => true,
            ];
        } catch(\Exception $e) {
            DB::rollback();

            Log::info('update chore error');
            Log::info($e->getMessage());

            return [
                'success' => false,
                'error' => 'Unable to update message',
                'description' => $e->getMessage()
            ];
        }
    }
}