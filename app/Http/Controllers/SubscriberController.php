<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

use App\Http\Requests\Subscriber\CreateRequest;
use App\Notifications\SubscribeEmailNotification;
use App\Models\Subscriber;

class SubscriberController extends Controller
{
    public function create(CreateRequest $request) 
    {
        $validData = $request->validated();
        $returningSubscriber = Subscriber::onlyTrashed()->where('email', $request->email)->first();

        if(!empty($returningSubscriber))
        {
            $subscriber = $returningSubscriber->restore();
            $message = "Successfully resubscribed!";
            $responseCode = 200;
        }
        else if(empty(Subscriber::where('email', $request->email)->first()))
        {
            $subscriber = Subscriber::create([
                'name' => $request->name,
                'email' => $request->email
            ]);
            $message = "Successfully subscribed!";
            $responseCode = 200;
        }
        else
        {
            $message = "User is already subscribed";
            $responseCode = 409;
        }

       if(!empty($subscriber))
       { 
           $subscription = Notification::send($subscriber, new SubscribeEmailNotification());
           return $subscription;
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
