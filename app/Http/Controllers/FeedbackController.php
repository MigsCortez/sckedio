<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Feedback\CreateRequest;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function create(CreateRequest $request)
    {
        $validData = $request->validated();
        $feedback = new Feedback;
        $feedback->fill($validData)->save();

        return response()->json([
            'message' => 'Success'
        ], 200);
    }
}
