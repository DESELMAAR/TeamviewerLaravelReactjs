<?php

use App\Http\Controllers\api\apiController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\orderUserController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);    
    Route::get('/user', function (Request $request) {
            return $request->user();
        });
       

        Route::apiResource('/users', controller: UserController::class);
        Route::apiResource("/services", ServiceController::class);
        Route::apiResource("/teams",TeamController::class);
        Route::apiResource("/orders",OrderController::class);
        Route::apiResource("/orders_user",orderUserController::class);


});



Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);

