<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Flight\FlightService;
use App\Http\Requests\FlightRequest;

class FlightController extends Controller
{

    /// http://127.0.0.1:8000/observeFlight?flight_number=HV6002
    public function getObserveFlight(FlightRequest $request, FlightService $flightService): bool
    {
        $data = $request->all();
            echo print_r($data); die;
        $flightService->checkFlightPosition($data);
    }
}