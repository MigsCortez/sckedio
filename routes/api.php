<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserInformationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('users/', [ApiController::class, 'list']);

Route::group([
    'prefix'=> 'auth'
], function(){
        Route::post('login',[AuthController::class, 'login']);
        Route::post('signup', [AuthController::class, 'signup']);

    Route::group([
        'middleware'=> 'auth:api'
    ], function(){
        // GET methods
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']); 
        Route::get('show-user-information', [UserInformationController::class, 'show']);
        //POST methods
        Route::post('create-user-information', [UserInformationController::class, 'create']);
        Route::put('update-user-information', [UserInformationController::class, 'update']);
    });
});