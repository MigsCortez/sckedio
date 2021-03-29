<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\UserInformation;
use App\Models\User;
use App\Models\DisplayPicture;

// Requests
use App\Http\Requests\UserRequest\UpdateRequest;

class UserInformationController extends Controller
{
    public function show(Request $request) {
        $userId = Auth::id();
        $userInformation = User::find($userId)->user_information;

        if(!empty(auth()->user()->activeDisplayPicture))
        {
            $userInformation->display_picture = auth()->user()->activeDisplayPicture->pluck('url')->first();
        }
        else
        {
            $userInformation->display_picture = "";
        }

        if(empty($userInformation)){
            return response()->json([
                'message' => 'User Information not found.'
            ], 404);
        }

        return response()->json([$userInformation]);
    }

    public function update(UpdateRequest $request) 
    {
        $validData = $request->validated();

        $user = Auth::user();
        $userCredentials = User::findOrFail($user->id);
        $userInformation = $userCredentials->user_information;
        
        $date = str_replace('-', '_', Carbon::now()->toDateString());
        
        // Checks if display_picture has data.
        if(!empty($request->display_picture))
        {
            $activeDisplayPictures = auth()->user()->activeDisplayPicture;

            foreach($activeDisplayPictures as $activeDisplayPicture)
            {
                $activeDisplayPicture->is_active = 0;
                $activeDisplayPicture->save();
            }

            $fileDirectory = "users/".$user->username."/"."display_pictures";
            $displayPicture = $request->file('display_picture');
            $filename = $date.'_'.$displayPicture->getClientOriginalName();
            $path = Storage::disk('s3')->putFileAs($fileDirectory, $displayPicture, $filename, 'public');

            $displayPictureFile = new DisplayPicture([
                'filename' => basename($path),
                'url' => Storage::disk('s3')->url($path),
                'is_active' => 1,
            ]);

            $displayPictureFile->user()->associate($user);
            $displayPictureFile->save();
            return response()->json([
                'message' => 'Successfully uploaded picture.'
            ], 200);
        }

        // Checks if username, role and/or email are blank.
        if(!empty($request->username) || !empty($request->email)) 
        {
            $userCredentials->fill($validData)->save();
        }

        if(!empty($userInformation))
        {
           $userInformation->user()->associate($user);
           $userInformation->fill($validData);
           $userInformation->save();
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
