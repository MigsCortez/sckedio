<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Utilities\ProxyRequest;

class OAuthTokenController extends Controller
{
    protected $proxy;

    public function __construct(ProxyRequest $proxy)
    {
        $this->proxy = $proxy;
    }

    public function refresh() 
    {

        $response = $this->proxy->refreshAccessToken();

        if(empty($response['refresh_token']))
        {
            return response()->json([
                'message' => ''
            ], 403);
        }

        return response()->json([
        'access_token' => $response['access_token'],
        'expires_in' => $response['expires_in'],
        'message' => 'Refreshed.'], 200);
    }
}
