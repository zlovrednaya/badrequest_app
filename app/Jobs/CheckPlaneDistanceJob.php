<?php

namespace App\Jobs;

use App\Services\FlightService;
use App\Models\FlightSubscriber;
use App\Services\NotificationService;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CheckPlaneDistanceJob implements ShouldQueue
{
    use Queueable;

    public int $flightSubscriberId;

    public function __construct(int $flightSubscriberId)
    {
        $this->flightSubscriberId = $flightSubscriberId;
    }

    public function handle(FlightService $flightService, NotificationService $notificationService)
    {
        Log::info('CheckPlaneDistanceJob launched');
        // 0 - find flight in DB
        $subscription = FlightSubscriber::find($this->flightSubscriberId);
        // 1 - send request to retrieve flight from API
        $flightData = 1;
        // 2 - check position
        // 3 - send notification or repeat
        Log::info($subscription);
        if (!empty($subscription)) {
            if ($flightService->checkFlightPosition($subscription['id'])) {
                Log::info('CheckPlaneDistanceJob. Need message = TRUE');
                $notificationService->sendMessage($subscription);
            } else {
                Log::info('CheckPlaneDistanceJob. Need message = FALSE');
                die;
                self::dispatch($this->flightSubscriberId)->delay(now()->addMinutes(5));
            }
        }

        die;

        // re-check in 5 minutes
        self::dispatch($watch->id)->delay(now()->addMinutes(5));
    }
}