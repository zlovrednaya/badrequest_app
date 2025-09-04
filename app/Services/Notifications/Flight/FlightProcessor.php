<?php

class Flight
{
    public $updateDelay; // min
    public $radius = 5.0; // distance near the flight
    public function getUpdate()
    {

    }

    public function isWithinRadius(float $lat1, float $lon1, float $lat2, float $lon2): bool
    {
        $radius = $this->radius;
        $earthRadius = 6371; // Earth's radius in km

        // Convert degrees to radians
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        // Haversine formula
        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;

        $a = sin($dLat / 2) ** 2
           + cos($lat1) * cos($lat2) * sin($dLon / 2) ** 2;

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;

        return $distance <= $radius;
    }

    public function sendMessage()
    {
        
    }


}