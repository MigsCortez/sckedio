<?php

namespace App\Http\Controllers;

// temporary
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
// END
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Services\UserAuthentication\UserAuthenticationService;
use App\Http\Requests\UserRequest\SignUpRequest;
use App\Http\Requests\UserRequest\LogInRequest;


class AuthController extends Controller
{

    protected $userAuthentication;

    public function __construct(UserAuthenticationService $userAuthentication) 
    {
        $this->userAuth = $userAuthentication;
    }

     public function signup(SignUpRequest $request) 
     {
        $status = $this->userAuth->handleSignUp($request);
        return $status;
     }


     /**
      * Login user and create token
      * @param [string] email
      * @param [string] password
      * @return [string] token_type
      * @return [string] expires_at
      */

      public function login(LogInRequest $request) 
      {
        // $status = $this->userAuth->handleLogIn($request);
        // return $status;
        $credentials = request(['username', 'password']);
        
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        
        $response = Http::asForm()->post(env('APP_URL') . '/oauth/token', [
                'client_id' => env('PROXY_OAUTH_CLIENT_ID'),
                'client_secret' => env('PROXY_OAUTH_CLIENT_SECRET'),
                'grant_type' => 'password',
                'username' => $request->username,
                'password' => $request->password,
                'scopes' => '[*]'
        ]);

        return $response->json();
      }

      /**
       * Logout user (Revoke the token)
       * @return [string] message
       */

       public function logout(Request $request) 
       {
            $tokenId = $request->user()->token()->id;
            $status = $this->userAuth->handleLogOut($tokenId);
            return $status;
       }

       /**
        * Get the authenticated user
        *
        * @return [json] user object 
        */

        public function user(Request $request) 
        {
            $status = $this->userAuth->findCurrentUser();
            return $status;
        }
}
