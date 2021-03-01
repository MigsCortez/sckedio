<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\UserInformation;
use App\Models\User;
// Requests
use App\Http\Requests\UserRequest\UpdateRequest;

class UserInformationController extends Controller
{
    public function show(Request $request) {
        $user_id = Auth::id();
        $user_information = User::find($user_id)->user_information;

        if(empty($user_information)){
            return response()->json([
                'message' => 'User Information not found.'
            ], 404);
        }

        return response()->json([$user_information]);
    }

    public function update(UpdateRequest $request) 
    {
        $validData = $request->validated();

        $user_credentials = User::findOrFail($user_id);
        $user_information = User::find($user_id)->user_information;
        
        // Checks if username and/or email are blank.
        if(empty($request->username)) {
            $request->username = $user_credentials->username;
        }
        if(empty($request->email)) {
            $request->email = $user_credentials->email;
        }

        // Checks if current user has user information data.
        if(!empty($user_information)){
            // Update user information
            $user_credentials->username = $request->username;
            $user_credentials->email = $request->email;
            $user_credentials->save();
            $user_information->first_name = $request->first_name;
            $user_information->last_name = $request->last_name;
            $user_information->state = $request->state;
            $user_information->city = $request->city;
            $user_information->street = $request->street;
            $user_information->postal_code = $request->postal_code;
            $user_information->country = $request->country;
            $user_information->save();

        } else {
            return response()->json([
                'message' => 'User information not found.'
            ], 404);
        }

        if($user->hasRole('manufacturer'))
        {
            if(!$request->manufacturer)
            {
                $user->removeRole('manufacturer');
            }
        }
        else
        {
            if($request->manufacturer)
            {
                $user->assignRole('manufacturer');
            }
        }

        if($user->hasRole('designer'))
        {
            if(!$request->designer)
            {
                $user->removeRole('designer');
            }
        }
        else
        {
            if($request->designer)
            {
                $user->assignRole('designer');
            }
        }

        return response()->json([
            'message' => 'Successfully updated user information.'
        ], 201);
    }
}
