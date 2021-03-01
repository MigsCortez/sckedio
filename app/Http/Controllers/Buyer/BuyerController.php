<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\BuyerQueue;
use App\Models\Designer\Design;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class BuyerController extends Controller
{
    public function create($id)
    {
        $authenticatedUser = auth()->user()->id;
        
        $checkBuyerOwnDesign = $this->checkBuyerOwnDesign($id, $authenticatedUser);
        $checkDesignBuyer = $this->checkDesignBuyer($id, $authenticatedUser);

        // return $checkBuyerOwnDesign;

        if($checkBuyerOwnDesign)
        {
            return response()->json([
                'message' => 'Designer can\'t take interest on their own design/s.' 
            ], 406);
        }
        else 
        {
            if($checkDesignBuyer)
            {
                $design = Design::where('id', $id)->first();

                $buyerQueue = new BuyerQueue;

                $buyerQueue->buyer_id = $authenticatedUser;
                $buyerQueue->design_id = $design->id;
                $buyerQueue->is_active = 1;
                $buyerQueue->save();

                return response()->json([
                    'message' => 'Successfully added buyer!'
                ], 200);
            }
            else if(!$checkDesignBuyer)
            {
                return response()->json([
                    'message' => 'Buyer has already took interest!'
                ], 406);
            }
        }
    }

    // Services

    protected function checkBuyerOwnDesign($id, $userId)
    {
        $design = Design::where('id', $id)->where('owner_id', $userId);
        
        if(!$design->first())
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    protected function checkDesignBuyer($id, $userId)
    {
        $design = BuyerQueue::where('design_id', $id)->where('buyer_id', $userId)->first();

        if(empty($design))
        {
            return true;
        }

        else
        {
            return false;
        }
        
    }
}
