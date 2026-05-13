<?php

namespace App\Services\Integrations\Telegram;

use Illuminate\Support\Facades\Log;

class TelegramUpdateService
{
    public function processUpdates($update)
    {
        Log::info('new update');
        Log::info($update);
    }
}