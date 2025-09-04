<?php

class Flight
{
    public $updateDelay; // min
    public $radius = 5.0; // distance near the flight
    public function getUpdate()
    {

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

    public function sendMessage()
    {
        
    }


}