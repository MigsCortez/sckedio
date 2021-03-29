<?php 

namespace App\Http\Controllers\Services\UserAuthentication;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Utilities\ProxyRequest;
use App\Models\DisplayPicture;
use App\Models\UserInformation;
use App\Models\User;

class UserAuthenticationService
{

     protected $proxy;

     public function __construct(ProxyRequest $proxy)
     {
        $this->proxy = $proxy;
     }

    public function handleSignUp(object $user_credentials)
    {
        $user = User::create([
            'username' => $user_credentials['username'],
            'email' => $user_credentials['email'],
            'password' => bcrypt($user_credentials['password'])
        ]);

        $user_information = new UserInformation([
            'first_name' => "",
            'last_name' => "",
            'state' => "",
            'city' => "",
            'street' => "",
            'postal_code' => "",
            'country' => "" 
        ]);

        $user_information->user()->associate($user);
        $user_information->save();
        
        $user->assignRole('buyer');

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function handleLogIn(object $user_credentials)
    {
        $credentials = ['username' => $user_credentials['username'], 'password' => $user_credentials['password']];

        if(!Auth::attempt($credentials))
        {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        else
        {
            $response = $this->proxy->grantPasswordToken($user_credentials['username'], $user_credentials['password']);
        }
        
        return response()->json([
            'access_token' => $response['access_token'],
            'expires_in' => $response['expires_in'],
            'message' => 'You are now logged in!'
        ], 200);
    }

    public function handleLogOut(string $tokenId)
    {
        $result = $this->proxy->revokeTokens($tokenId);

        cookie()->queue(cookie()->forget('refresh_token'));

        return $result;
    }

    public function findCurrentUser()
    {
        $user = Auth::user();
        $user_information = User::find($user->id)->user_information;
        $role = $user->roles->pluck('name');
        
        if(!empty(auth()->user()->activeDisplayPicture))
        {
            $user->display_picture = auth()->user()->activeDisplayPicture->pluck('url')->first();
        }
        else
        {
            $user->display_picture = "";
        }

        return response()->json([
            $user, 
            $user_information,
            $role,
        ], 200);
    }
}
