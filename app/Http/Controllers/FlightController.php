<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Flight\FlightService;
use App\Http\Requests\FlightRequest;

class FlightController extends Controller
{

    // http://127.0.0.1:8000/observeFlight
    public function postObserveFlight(FlightRequest $request, FlightService $flightService)
    {
        $data = $request->all();
       
        $response = $flightService->createFlight($data);

        return response()->json($response);
    }
}