<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ChoresController;
use App\Http\Controllers\UserController;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/observeFlight', [ FlightController::class, 'postObserveFlight' ]);
Route::post('/register', [ RegisterController::class, 'postRegister' ]);
Route::post('/login', [ LoginController::class, 'authenticate' ]);
Route::post('/logout', [ LoginController::class, 'logout' ]);


Route::patch('/chores/update/{chore}', [ ChoresController::class, 'update']);
Route::get('/chores/getList', [ ChoresController::class, 'getList']);
Route::get('/chores/getAllForCalendar', [ ChoresController::class, 'getAllForCalendar']);
Route::get('/chores/getAmount', [ChoresController::class, 'getAmount']);
Route::get('/chores/getUserSettings', [ChoresController::class, 'getUserSettings']);
Route::get('/chores/getBatches', [ChoresController::class, 'getBatches']);
Route::get('/chores/{id}', [ChoresController::class, 'getById']);
Route::post('/chores/add', [ ChoresController::class, 'add']);
Route::post('/chores/getChoresStructure', [ ChoresController::class, 'getChoresStructure']);
Route::post('/chores/filterChores', [ ChoresController::class, 'filterChores']);
Route::post('/chores/deleteChores', [ChoresController::class, 'deleteChores']);
Route::post('/chores/shareChores', [ChoresController::class, 'shareChores']);
Route::post('/chores/shareTelegramChores', [ChoresController::class, 'shareTelegramChores']);
Route::post('/chores/saveBatch', [ChoresController::class, 'saveBatch']);
Route::post('/chores/saveUserSettings', [ChoresController::class, 'saveUserSettings']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/user/syncTelegram', [UserController::class, 'syncTelegram']);

Route::post('/user/save', [UserController::class, 'update']);

Route::post('/notifications/getUpdates', [NotificationController::class, 'getUpdates']);