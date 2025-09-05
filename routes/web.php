<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlightController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/observeFlight', [ FlightController::class, 'getObserveFlight' ]);
