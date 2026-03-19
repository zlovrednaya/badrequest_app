<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/observeFlight', [ FlightController::class, 'postObserveFlight' ]);

Route::post('/register', [ RegisterController::class, 'register' ]);
Route::post('/login', [ LoginController::class, 'login' ]);
Route::post('/logout', [ LoginController::class, 'logout' ]);