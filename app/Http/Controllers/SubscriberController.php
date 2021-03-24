<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Subscriber\CreateRequest;
use App\Models\Subscriber;

class SubscriberController extends Controller
{
    public function create(CreateRequest $request) 
    {
        $validData = $request->validated();
        $subscriber = new Subscriber;
        $returningSubscriber = $subscriber->onlyTrashed()->where('email', $request->email)->first();

        if(!empty($returningSubscriber))
        {
            $returningSubscriber->restore();
            $message = "Successfully resubscribed!";
            $responseCode = 200;
        }
        else if(empty($subscriber->where('email', $request->email)->first()))
        {
            $subscriber->fill($validData)->save();
            $message = "Successfully subscribed!";
            $responseCode = 200;
        }
        else
        {
            $message = "User is already subscribed";
            $responseCode = 409;
        }
        return response()->json([
            'message' => $message
        ], $responseCode);
    }

    public function delete($email)
    {
        $subscriber = Subscriber::where('email', $email)->delete();

        if(empty($subscriber))
        {
            $message = "Could not find email.";
            $responseCode = 404;
        }
        else
        {
            $message = "Successfully unsubscribed!";
            $responseCode = 200;
        }

        return response()->json([
            'message' => $message
        ], $responseCode);
    }
}
