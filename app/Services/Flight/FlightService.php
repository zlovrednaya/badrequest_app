<?php
namespace App\Services\Flight;

use App\Services\Integrations\IntegrationFactory;
use App\Services\Notifications\MailerSendService;

class FlightService
{
    public $updateDelay; // min
    public $radius = 5.0; // distance near the flight

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

    public function checkFlightPosition(array $data): bool
    {
        $payload = $this->prepareData($data);

        $aviationStack = IntegrationFactory::create('aviationstack');
        $rawFlight = $aviationStack->getFlightData($payload);

        if (empty($rawFlight)) {
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
        if ($this->isWithinRadius($airport['lat'], $airport['lon'], $flight['lat'], $flight['lon'])) {
            // sendMessage
            echo print_r('is within radius 5km'); die;
        } else {
            echo print_r('is NOT within radius 5km'); die;
        }

    }

    private function processFlight(array $flight): array
    {
        $flight = $flight['data'][0];
        return [
                'airport' => $flight['arrival'] ?? null,
                'lat' => $flight['live']['latitude'] ?? null,
                'lon' => $flight['live']['longitude'] ?? null,
        ];
    }

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

}