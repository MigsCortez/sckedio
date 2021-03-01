<?php

namespace App\Http\Controllers;

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

    public function login(LogInRequest $request) 
    {
    $status = $this->userAuth->handleLogIn($request);
    return $status;
    }

    public function logout(Request $request) 
    {
        $tokenId = $request->user()->token()->id;
        $status = $this->userAuth->handleLogOut($tokenId);
        return $status;
    }

    public function user(Request $request) 
    {
        $status = $this->userAuth->findCurrentUser();
        return $status;
    }
}
