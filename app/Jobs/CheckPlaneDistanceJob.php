<?php
use Illuminate\Contracts\Queue\ShouldQueue;

class CheckPlaneDistanceJob implements ShouldQueue
{
    public function handle(FlightService $flightService, NotificationService $notificationService)
    {
        // 1 - find flight
        // 2 - check position
        // 3 - send notification or repeat

        

        // re-check in 5 minutes
        self::dispatch($watch->id)->delay(now()->addMinutes(5));
    }
}