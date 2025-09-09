<?php

namespace App\Http\Controllers;

use App\Models\Integrations\IntegrationFactory;
use App\Http\Controllers\Controller;
use App\Models\Integrations\AviationStack;
use App\Http\Requests\FlightRequest;

class FlightController extends Controller
{

    /// http://127.0.0.1:8000/observeFlight?flight_number=HV6002
    public function getObserveFlight(FlightRequest $request): bool
    {
      
        $data = $request->all();
        $aviationStack = IntegrationFactory::create('aviationstack');
        $aviationStack->getFlightSata($data);
        
    }
}