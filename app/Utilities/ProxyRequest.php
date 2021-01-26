<?php

namespace App\Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\RefreshTokenRepository;

class ProxyRequest 
{
    public function grantPasswordToken(string $username, string $password) {
        // Parameters needed for Password Grant
        
        $params = [
            'grant_type' => 'password',
            'username' => $username,
            'password' => $password,
        ];

        return $this->makePostRequest($params);
    }

    public function revokeTokens(string $accessTokenId) {
        $tokenRepository = app(TokenRepository::class);
        $refreshTokenRepository = app(RefreshTokenRepository::class);
        
        $tokenRepository->revokeAccessToken($accessTokenId);
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($accessTokenId);

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }

    public function refreshAccessToken() {
        // Conditions refresh_token if it is available, missing, and/or expired.

        $refreshToken = request()->cookie('refresh_token');
        
        if(!$refreshToken) {
            cookie()->queue(cookie()->forget('refresh_token'));
            abort_unless($refreshToken, 403, 'Please log in.');
        }

        $params = [
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken
        ];

        return $this->makePostRequest($params);
    }

    protected function makePostRequest(array $params) {
    // Initial values to return for Passport routes  especially the client's id and secret.

        $params = array_merge($params, [
            'client_id' => config('services.passport.password_client_id'),
            'client_secret' => config('services.passport.password_client_secret'),
            'scopes' => '*',
        ]);

        $proxy = Http::asForm()->post('https://sckedio-passport.herokuapp.com/oauth/token', $params);
        $this->setHttpOnlyCookie($proxy['refresh_token']);
        
        return $proxy;
    }

    protected function setHttpOnlyCookie(string $refreshToken) {
        // Refresh Token is use as httponly cookie.

        cookie()->queue(
            'refresh_token',
            $refreshToken,
            14400, // 10 days
            null,
            null,
            false,
            true
        );
    }
}