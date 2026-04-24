<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
Route::get('/chores/getList', [ ChoresController::class, 'getList']);
Route::post('/chores/getChoresStructure', [ ChoresController::class, 'getChoresStructure']);
Route::post('/chores/filterChores', [ ChoresController::class, 'filterChores']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');