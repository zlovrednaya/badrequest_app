<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Services\Integrations\Telegram\TelegramApi;
use App\Services\Integrations\Telegram\TelegramUpdateService;

class TelegramPollCommand extends Command
{
    protected $signature = 'telegram:poll';

    public function handle(
        TelegramApi $telegram,
        TelegramUpdateService $updateService,
    ) {
        $updates = $telegram->getUpdates();

        if(empty($updates)){
            return;
        }

        foreach($updates as $update) {
            $updateService->processUpdates($update);
        }


    }
}