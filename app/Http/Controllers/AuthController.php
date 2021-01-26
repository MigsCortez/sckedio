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

      public function login(Request $request) 
      {

        // $status = $this->userAuth->handleLogIn($request);
        // return $status;
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = request(['username', 'password']);
        
        if(!Auth::attempt($credentials))
        {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $username = $request->username;
        $password = $request->password;

        $request->request->add([
            'grant_type' => 'password',
            'client_id' => config('services.passport.password_client_id'),
            'client_secret' => config('services.passport.password_client_secret'),
            'username' => $username,
            'password' => $password,
            'scope' => '*'
        ]);
        $tokenRequest = Request::create(
            env('APP_URL').'/oauth/token',
            'post'
        );

        return $proxy;
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
