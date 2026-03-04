<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Flight;
use App\Models\Subscriber;
use App\Models\FlightSubscriber;
use App\Services\Integrations\IntegrationFactory;
use App\Notifications\Channels\MailerSend;
use App\Jobs\CheckPlaneDistanceJob;

class FlightService
{
    public $updateDelay; // min
    public $radius = 5.0; // distance near the flight

    public function __construct(string $providerName = 'aviationstack')
    {
        $this->provider = IntegrationFactory::create($providerName);
    }

    public function getUpdate()
    {

    }

    private function prepareData($data): array
    {
        return [
            'limit' => 1,
            'flight_iata' => $data['flight_number'],
        ];
    }

    public function getFlight(array $data): array
    {
        
    }

    public function checkFlightPosition(array $data): array
    {
        $payload = $this->prepareData($data);
        $rawFlight = $this->provider->getFlightData($payload);

        if (empty($rawFlight) || empty($rawFlight['data'])) {
            return [
                'status' => false,
                'error' => 'Flight not found.',
            ];
        }
        $flight = $this->processFlight($rawFlight);

        if (empty($flight['airport'])) {
            return [
                'status' => false,
                'error' => 'Airport not found.',
            ];
        }
        $rawAirport = $this->provider->getAirportData($flight['airport']);
        $airport = $this->processAirport($rawAirport);
        
        if (empty($flight['lat']) || $flight['lon']) {
            return [
                'status' => false,
                'error' => 'Flight is not active.',
            ];
        }
        $withinRadiusBool = $this->isWithinRadius($airport['lat'], $airport['lon'], $flight['lat'], $flight['lon']);
        
        return [
                'status' => $withinRadiusBool,
                'message' => $withinRadiusBool ? 'Flight is within radius 5km' : 'Flight is NOT within radius 5km',
                'flight' => $flight,
                'airport' => $airport,
            ];

    }

    private function processFlight(array $flight): array
    {
    
        $flight = $flight['data'][0];
        return [
                'airport' => $flight['arrival'] ?? null,
                'lat' => $flight['live']['latitude'] ?? null,
                'lon' => $flight['live']['longitude'] ?? null,
                'flight_date' => $flight['flight_date'] ?? null,
        ];
    }
    
    /**
     * input array
     * output array
     */
    private function processAirport(array $airport): array
    {
        $airport = $airport['data'][0];
        return [
            'lat' => $airport['latitude'] ?? null,
            'lon' => $airport['longitude'] ?? null,
        ];
    }

    public function isWithinRadius(float $airportLat, float $airportLon, float $flightLat, float $flightLon): bool
    {
        $radius = $this->radius;
        $earthRadius = 6371; // Earth's radius in km

        // Convert degrees to radians
        $airportLat = deg2rad($airportLat);
        $airportLon = deg2rad($airportLon);
        $flightLat = deg2rad($flightLat);
        $flightLon = deg2rad($flightLon);

        // Haversine formula
        $dLat = $flightLat - $airportLat;
        $dLon = $flightLon - $airportLon;

        $a = sin($dLat / 2) ** 2
           + cos($airportLat) * cos($flightLat) * sin($dLon / 2) ** 2;

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;

        return $distance <= $radius;
    }

    /**
     * input array
     * get Flight and Airport and insert flight data(flights,subscribers,flights_subscribers) to db
     */
    public function createSubscription(array $data)
    {
        $payload = $this->prepareData($data);

        $aviationStack = IntegrationFactory::create('aviationstack');
        $rawFlight = $aviationStack->getFlightData($payload);

        if (empty($rawFlight) || empty($rawFlight['data'])) {
            return [
                'error' => 'Flight not found.',
            ];
        }
        $flight = $this->processFlight($rawFlight);

        if (empty($flight['airport'])) {
            return [
                'error' => 'Airport not found.',
            ];
        }
        $rawAirport = $aviationStack->getAirportData($flight['airport']);
        $airport = $this->processAirport($rawAirport);
        
        if (!($flight['lat'] ?? $flight['lon'])) {
            return [
                'error' => 'Flight is not active.',
            ];
        }

        DB::beginTransaction();
        try {
            $flight = Flight::firstOrCreate([
                'flight_number' => $data['flight_number'],
                'status' => 'new',
                'flight_date' => $flight['flight_date'],
            ]);
            $subscriber = Subscriber::firstOrCreate(
                [
                    'channel' => 'email',
                    'receiver' => $data['email'],
                ]
            );
            $flightSubscriber = FlightSubscriber::firstOrCreate([
                'flight_id' => $flight->id,
                'subscriber_id' => $subscriber->id,
                'notification_status' => 'new',
            ]);
            DB::commit();
        } catch (\Exception $e) {
            
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to create flight sibscription',
            ];
        }

        CheckPlaneDistanceJob::dispatch($flightSubscriber->id);

        return [
            'success' => true,
            'message' => 'Flight has been saved. Please wait for the e-mail about your flight.',
        ];
    }

}