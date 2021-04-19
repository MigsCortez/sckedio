<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Design\DesignController;
use App\Http\Controllers\Buyer\BuyerController;
use App\Http\Controllers\Manufacturer\ManufacturerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\UserInformationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SocialLinkController;
use App\Http\Controllers\OAuthTokenController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\DesignRatingController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('users/', [ApiController::class, 'list']);
Route::get('categories', [ApiController::class, 'getCategories']);
Route::get('idea-types', [ApiController::class, 'getIdeaTypes']);
Route::get('stock-types', [ApiController::class, 'getStockTypes']);



Route::group([
    'prefix' => 'subscriber'
], function() {
    Route::post('create', [SubscriberController::class, 'create']);
    Route::delete('delete/{email}', [SubscriberController::class, 'delete']);
});

Route::group([
    'prefix' => 'feedback'
], function() {
    Route::post('create', [FeedbackController::class, 'create']);
});

Route::group([
    'prefix'=> 'auth'
], function() {
        Route::post('login',[AuthController::class, 'login']);
        Route::post('signup', [AuthController::class, 'signup']);
        
        //Refresh access token
        Route::get('refresh', [OAuthTokenController::class, 'refresh']);

    Route::group([
        'middleware'=> 'auth:api'
    ], function(){
        // AuthController
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']); 

        //UserInformationController
        Route::get('show-user-information', [UserInformationController::class, 'show']);
        Route::post('create-user-information', [UserInformationController::class, 'create']);
        Route::post('update-user-information', [UserInformationController::class, 'update']);

        //UserController
        Route::get('show-user', [UserController::class, 'show']);
        Route::put('update-user', [UserController::class, 'update']);

        //SocialLinkController
        Route::resource('social-link', SocialLinkController::class);
    });
});

Route::group([
    'prefix' => 'auth'
], function() {
    Route::group([
        'middleware' => ['auth:api'], 'prefix' => 'design-rating'
    ], function() {
        Route::post('store', [DesignRatingController::class, 'store']);
        Route::get('show/{id}', [DesignRatingController::class, 'show']);
    });
});

Route::group([
    'prefix' => 'designer'
], function() {
    Route::get('list', [DesignController::class, 'listAllDesigns']);
    Route::get('show-design/{id}', [DesignController::class, 'showDesign']);

    Route::group([
        'middleware' => ['auth:api'], 'prefix' => 'auth'
    ], function(){
        Route::get('list', [DesignController::class, 'list']); // Should be able to view for autheticated users.
        Route::get('show/{id}', [DesignController::class, 'show']); // Should be able to view for autheticated users.

        Route::group([
            'middleware' => ['role:designer']
        ], function() {
            Route::post('create', [DesignController::class, 'create']);
            Route::post('upload/file/{id}', [DesignController::class, 'uploadFiles']);
            Route::put('update/{id}', [DesignController::class, 'update']);
        });
    });
});

Route::group([
    'prefix' => 'buyer'
], function() {
    Route::group([
        'middleware' => ['auth:api', 'role:buyer']
    ], function() {
        Route::post('create/{id}', [BuyerController::class, 'create']);
        Route::delete('delete/{id}');
    });
});

Route::group(['prefix' => 'manufacturer'
], function(){
    Route::group([
        'prefix' => 'auth','middleware' => 'auth:api'
    ], function(){
        Route::post('create/{id}', [ManufacturerController::class, 'create']);
    });
});

Route::group([
    'prefix' => 'guest'
], function() {
    Route::group([
        'middleware' => 'guest:api'    
    ], function (){
        // Changing password
        Route::post('/forgot-password', [PasswordController::class, 'mail_reset_link'])->name('password.mail');
        Route::get('/reset-password/{token}', [PasswordController::class, 'reset_password'])->name('password.reset');
        Route::post('/reset-password', [PasswordController::class, 'update_password'])->name('password.update');
    });
});

