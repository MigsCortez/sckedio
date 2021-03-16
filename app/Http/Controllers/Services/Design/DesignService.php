<?php

namespace App\Http\Controllers\Services\Design;

use Carbon\Carbon;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Designer\CreateRequest;
use App\Models\Designer\Design;
use App\Models\User;
use App\Models\Designer\DesignInformation;
use App\Models\Designer\IdeaType;
use App\Models\Designer\DesignFile;

class DesignService
{
    protected function getAuthenticatedUser()
    {
        return Auth::user();
    }

    // For unautheniticated users.

    public function handleListAllDesigns()
    {
        $users = DB::table('users')
                    ->join('designs', 'users.id', '=', 'owner_id')
                    ->join('designs_information', 'designs.id', '=', 'design_id')
                    ->join('design_files', 'designs.id', '=', 'design_files.design_id')->where('is_private', 0)
                    ->select(
                    'users.id as user_id',
                    'users.username', 
                    'designs.id as design_id',
                    'designs.idea_name',
                    'designs.created_at', 
                    'designs_information.description', 
                    'designs_information.design_cost',
                    'designs_information.category_id',
                    'designs_information.idea_type_id',
                    DB::raw('group_concat(design_files.url) as images'))
                    ->groupBy(
                    'users.id',
                    'users.username', 
                    'designs.id',
                    'designs.idea_name',
                    'designs.created_at', 
                    'designs_information.description', 
                    'designs_information.design_cost',
                    'designs_information.category_id',
                    'designs_information.idea_type_id',)
                    ->get();

        foreach($users as $user)
        {
            $user->images = explode(',', $user->images);
            $user->interests = DB::table('buyer_queue')->where('design_id', $user->design_id)->count();
        }
        
        return response()->json([
            'designs' => $users
        ], 200);
                                
    }

    public function handleShowDesign($id)
    {
        $designs = DB::table('designs')
        ->where('designs.id', $id)
        ->join('users', 'users.id', '=', 'owner_id')
        ->join('designs_information', 'designs.id', '=', 'design_id')
        ->join('design_files', 'designs.id', '=', 'design_files.design_id')->where('is_private', 0)
        ->select(
        'users.id as user_id',
        'users.username', 
        'designs.id as design_id',
        'designs.idea_name',
        'designs.created_at', 
        'designs_information.description', 
        'designs_information.design_cost',
        'designs_information.category_id',
        'designs_information.idea_type_id',
        DB::raw('group_concat(design_files.url) as images'))
        ->groupBy(
        'users.id',
        'users.username', 
        'designs.id',
        'designs.idea_name',
        'designs.created_at', 
        'designs_information.description', 
        'designs_information.design_cost',
        'designs_information.category_id',
        'designs_information.idea_type_id',)
        ->get();

        foreach($designs as $design)
        {
            $design->images = explode(',', $design->images);
            $design->interests = DB::table('buyer_queue')->where('design_id', $design->design_id)->count();
        }

        return response()->json([
            'design' => $designs,
        ]);
    }

    public function handleList()
    {
        $designs = DB::table('users')
                    ->join('designs', 'users.id', '=', 'owner_id')
                    ->join('designs_information', 'designs.id', '=', 'design_id')
                    ->join('design_files', 'designs.id', '=', 'design_files.design_id')->where('is_private', 0)
                    ->select(
                    'users.id as user_id',
                    'users.username', 
                    'designs.id as design_id',
                    'designs.idea_name',
                    'designs.created_at', 
                    'designs_information.description', 
                    'designs_information.design_cost',
                    'designs_information.category_id',
                    'designs_information.idea_type_id',
                    DB::raw('group_concat(design_files.url) as images'))
                    ->groupBy(
                    'users.id',
                    'users.username', 
                    'designs.id',
                    'designs.idea_name',
                    'designs.created_at', 
                    'designs_information.description', 
                    'designs_information.design_cost',
                    'designs_information.category_id',
                    'designs_information.idea_type_id',)
                    ->get();


        foreach($designs as $design)
        {
            $design->images = explode(',', $design->images);
            $design->interests = DB::table('buyer_queue')->where('design_id', $design->design_id)->count();
            $buyerInterest = $this->buyerInterested($design->design_id);
            $design->is_interested = $buyerInterest;

            if($design->user_id === auth()->user()->id)
            {
                $privateImages = DB::table('design_files')->select(DB::raw('group_concat(url) as private_images'))->where('is_private', 1)->where('design_id', $design->design_id)->get();
                
                foreach($privateImages as $privateImage)
                {
                    $design->private_images = $privateImage->private_images;
                }
                $design->private_images = explode(',', $design->private_images);
            }
        }

        $designs = json_encode($designs);
        return json_decode($designs, true);
    }


    public function handleShow($id)
    {
        $designs = DB::table('designs')
        ->where('designs.id', $id)
        ->join('users', 'users.id', '=', 'owner_id')
        ->join('designs_information', 'designs.id', '=', 'design_id')
        ->join('design_files', 'designs.id', '=', 'design_files.design_id')->where('is_private', 0)
        ->select(
        'users.id as user_id',
        'users.username', 
        'designs.id as design_id',
        'designs.idea_name',
        'designs.created_at', 
        'designs_information.description', 
        'designs_information.design_cost',
        'designs_information.category_id',
        'designs_information.idea_type_id',
        DB::raw('group_concat(design_files.url) as images'))
        ->groupBy(
        'users.id',
        'users.username', 
        'designs.id',
        'designs.idea_name',
        'designs.created_at', 
        'designs_information.description', 
        'designs_information.design_cost',
        'designs_information.category_id',
        'designs_information.idea_type_id',)
        ->get();

        $design = str_replace (array('[', ']'), '' , $designs);

        foreach($designs as $design)
        {
            $design->images = explode(',', $design->images);
            $design->interests = DB::table('buyer_queue')->where('design_id', $design->design_id)->count();
            $buyerInterest = $this->buyerInterested($design->design_id);
            $design->is_interested = $buyerInterest;

            if($design->user_id === auth()->user()->id)
            {
                $privateImages = DB::table('design_files')->select(DB::raw('group_concat(url) as private_images'))->where('is_private', 1)->where('design_id', $design->design_id)->get();
                
                foreach($privateImages as $privateImage)
                {
                    $design->private_images = $privateImage->private_images;
                }
                $design->private_images = explode(',', $design->private_images);
            }
        }

        return response()->json([
            'design' => $design
        ]);
    }
    
    
    //TODO: Update design
    public function handleUpdate($id, object $request)
    {
        $authenticatedUser = $this->getAuthenticatedUser();
        $design = $authenticatedUser->design->where('id', $id)->where('owner_id', $authenticatedUser->id)->first();
        $designInformation = $this->getDesignInformation($design)
        ->update([ 
            'category_id' => $request['category_id'],
            'description' => $request['description'],
            'design_cost' => $request['design_cost'],
            'idea_type_id' => $request['idea_type']
         ]);

        return response()->json([
            'message' => 'Successfully updated design information.',
        ], 200);
    }

    public function handleUploadFile($id, object $request)
    {
        $authenticatedUser = $this->getAuthenticatedUser();
        $design = $authenticatedUser->design->where('id', $id)->where('owner_id', $authenticatedUser->id)->first();

        if(!empty($request['public_files']))
        {
            $this->storePublicFiles($request, $authenticatedUser, $design, $design->idea_name);
        }

        if(!empty($request['private_files']))
        {
            $this->storePrivateFiles($request, $authenticatedUser, $design, $design->idea_name);
        }

        return response()->json([
            'message' => 'Successfully added files!'
        ], 200);
    }

    public function handleCreateDesign(object $request)
    {
        $authenticatedUser = $this->getAuthenticatedUser();

        // Design
        $design = new Design([
            'idea_name' => $request['idea_name']
        ]);
        $design->user()->associate($authenticatedUser);
        $design->save();

        // Design Information
        $design_information = new DesignInformation([
            'category_id' => $request['category'],
            'description' => $request['description'],
            'design_cost' => $request['design_cost'],
            'idea_type_id' => $request['idea_type']
        ]);
        $this->saveDesign($design_information, $design);

        // Design Upload
        if(!empty($request['public_files']))
        {
           $status = $this->storePublicFiles($request, $authenticatedUser, $design, $request->idea_name);
        }

        if(!empty($request['private_files']))
        {
            $this->storePrivateFiles($request, $authenticatedUser, $design, $request->idea_name);
        }

        return response()->json([
            'message' => 'Successful!'
        ], 200);
    }

    protected function storePublicFiles(object $request, object $authenticatedUser, object $design, string $ideaName)
    {
        $publicFiles = $request->file('public_files');
        $ideaName = strtolower(str_replace(' ', '_', $ideaName));
        $fileDirectory = "users/".$authenticatedUser->username."/".$ideaName."/"."public";
        $date = str_replace('-', '_', Carbon::now()->toDateString());

        foreach($publicFiles as $publicFile)
            {
                $filename = $date.'_'.$publicFile->getClientOriginalName();
                $path = Storage::disk('s3')->putFileAs($fileDirectory, $publicFile, $filename, 'public');
                $this->uploadPublicFiles($path, $design);
            }
    }


    protected function storePrivateFiles(object $request, object $authenticatedUser, object $design,string $ideaName)
    {
        $privateFiles = $request->file('private_files');
        $ideaName = strtolower(str_replace(' ', '_', $ideaName));
        $fileDirectory = "users/".$authenticatedUser->username."/".$ideaName."/"."private";
        $date = str_replace('-', '_', Carbon::now()->toDateString());

        foreach($privateFiles as $privateFile)
        {
            $filename = $date.'_'.$privateFile->getClientOriginalName();
            $path = Storage::disk('s3')->putFileAs($fileDirectory, $privateFile, $filename, 'public');
            $this->uploadPrivateFiles($path, $design);
        }
    }

    protected function uploadPublicFiles(string $path, object $design)
    {
        $designFile = new DesignFile([
                    'filename' => basename($path),
                    'url' => Storage::disk('s3')->url($path),
                    'is_private' => 0,
                ]);
        $this->saveDesign($designFile, $design);
    }

    protected function uploadPrivateFiles(string $path, object $design)
    {
        $designFile = new DesignFile([
                    'filename' => basename($path),
                    'url' => Storage::disk('s3')->url($path),
                    'is_private' => 1,
                ]);
        $this->saveDesign($designFile, $design);
    }

    protected function saveDesign(object $data, object $design)
    {
        $data->design()->associate($design);
        $data->save();
    }

    protected function getPublicFiles(object $design)
    {
        $publicFiles = $design->public_files;
        return $publicFiles;
    }

    protected function getPrivateFiles(object $design)
    {
        $privateFiles = $design->private_files;
        return $privateFiles;
    }

    protected function getDesignInformation(object $design)
    {
        $designInformation = $design->design_information;
        return $designInformation;
    }

    protected function buyerInterested($id)
    {
        $buyerInterest = auth()->user()->buyer_queue->where('design_id', $id);

        if($buyerInterest->first())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}
