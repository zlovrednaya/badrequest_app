<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ChoresController;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/observeFlight', [ FlightController::class, 'postObserveFlight' ]);
Route::post('/register', [ RegisterController::class, 'postRegister' ]);
Route::post('/login', [ LoginController::class, 'authenticate' ]);
Route::post('/logout', [ LoginController::class, 'logout' ]);
Route::post('/chores/add', [ ChoresController::class, 'add']);
Route::post('/chores/getList', [ ChoresController::class, 'getList']);