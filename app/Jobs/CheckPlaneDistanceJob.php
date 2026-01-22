<?php

namespace App\Jobs;

use App\Services\FlightService;
use App\Models\FlightSubscriber;

use Illuminate\Contracts\Queue\ShouldQueue;

class CheckPlaneDistanceJob implements ShouldQueue
{
    public int $flightSubscriberId;

    public function __construct(int $flightSubscriberId)
    {
        $this->flightSubscriberId = $flightSubscriberId;
    }

    public function handle(FlightService $flightService, NotificationService $notificationService)
    {
        // 1 - find flight
        $subscription = FlightSubscriber::find($this->flightSubscriberId);
        // 2 - check position
        // 3 - send notification or repeat

        echo print_r($subscription);die;
        if (!empty($subscription)) {
            if ($flightService->checkFlightPosition($subscription['id'])) {
                $notificationService->sendMessage();
            } else {
                self::dispatch($this->flightSubscriberId)->delay(now()->addMinutes(5));
            }
        }

        

        // re-check in 5 minutes
        self::dispatch($watch->id)->delay(now()->addMinutes(5));
    }
}