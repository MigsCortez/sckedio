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

        $user = Auth::user();
        $user_credentials = User::findOrFail($user->id);
        $user_information = $user_credentials->user_information;
        
        // Checks if username, role and/or email are blank.
        if(!empty($request->username) || !empty($request->email)) 
        {
            $user_credentials->fill($validData)->save();
        }

        if(!empty($user_information))
        {
           $user_information->user()->associate($user);
           $user_information->fill($validData);
           $user_information->save();
        } 
        else 
        {
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
