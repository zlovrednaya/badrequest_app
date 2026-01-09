<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlightController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/observeFlight', [ FlightController::class, 'postObserveFlight' ]);