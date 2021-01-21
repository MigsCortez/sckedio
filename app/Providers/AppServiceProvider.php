<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // if(config('app.env') === 'production')
        // {
        //     \URL::forceScheme('https');
        // }
        
        ResetPassword::createUrlUsing(function($notifiable, $token){
            return env('APP_URL')."/password-reset/{$token}";
        });
        Schema::defaultStringLength(191);
    }
}
