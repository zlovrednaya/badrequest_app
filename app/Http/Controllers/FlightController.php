<?php

namespace App\Http\Controllers;
use App\Models\Integrations\AviationStack;
use App\Http\Requests\FlightRequest;

class FlightController extends Controller
{
    public function observeFlight(FlightRequest $request): bool
    {
        $validated = $request->validated();
        
    }
}