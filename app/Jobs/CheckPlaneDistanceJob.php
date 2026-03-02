<?php

namespace App\Jobs;

use App\Services\FlightService;
use App\Services\NotificationService;

use App\Models\FlightSubscriber;
use App\Models\Flight;
use App\Models\Subscriber;

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
        if (!$subscription) {
            Log::warning("FlightSubscriber not found: {$this->flightSubscriberId}");

            return;
        }
        Log::info($subscription);

        $subscriber = Subscriber::find($subscription['subscriber_id']);
        Log::info($subscriber);
        
        if (!$subscriber) {
            Log::warning("Subscriber not found: {$subscription['subscriber_id']}");

            return;
        }

        // 1 - send request to retrieve flight from API
        $flight = Flight::find($subscription['flight_id']);

        if (!$flight) {
            Log::warning("Flight not found: {$subscription['flight_id']}");

            return;
        }
        Log::info($flight);

        // 2 - get flight's status
        // 3 - send notification or repeat
        
        /*$flightStatus = $flightService->checkFlightPosition([
            'flight_number' => $flight['flight_number'],
            'flight_date' => $flight['flight_date'],
        ]);
        Log::info($flightStatus);
        */
        $flightStatus = [
            'status' => true,
        ];
        
        if ($flightStatus['status']) {
            Log::info('CheckPlaneDistanceJob. Need message = TRUE');
            $notificationService->sendMessage([
                'channel' => $subscriber['channel'],
                'receiver' => $subscriber['receiver'],
                'flight_number' => $flight['flight_number'],
                'message' => __('notifications.flight.approaching', [
                    'flight'   => $flight['flight_number'],
                    'distance' => 5,
                ]),
            ]);
        } else {
            if($flightStatus['error']) {
                Log::warning("Job is terminated");

                return;
            }

            Log::info('CheckPlaneDistanceJob. Need message = FALSE');
            self::dispatch($this->flightSubscriberId)->delay(now()->addMinutes(1));
        }
        
        return;
    }
}