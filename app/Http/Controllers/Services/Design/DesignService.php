<?php

namespace App\Http\Controllers\Services\Design;

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
                    DB::raw('group_concat(design_files.file_route) as images'))
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
        DB::raw('group_concat(design_files.file_route) as images'))
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
            'design' => $design,
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
                    DB::raw('group_concat(design_files.file_route) as images'))
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
                $privateImages = DB::table('design_files')->select(DB::raw('group_concat(file_route) as private_images'))->where('is_private', 1)->where('design_id', $design->design_id)->get();
                
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
        DB::raw('group_concat(design_files.file_route) as images'))
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
                $privateImages = DB::table('design_files')->select(DB::raw('group_concat(file_route) as private_images'))->where('is_private', 1)->where('design_id', $design->design_id)->get();
                
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
    // public function handleShow($id)
    // {
    //     $authenticatedUser = $this->getAuthenticatedUser();
    //     $design = $authenticatedUser->design->where('id', $id)->first();
        
    //     if(empty($design))
    //     {
    //         return response()->json([
    //             'message' => 'Error! Could not find design associated with the user.'
    //         ]);
    //     }
    //     $designInformation = $this->getDesignInformation($design);
    //     $publicFiles = $this->getPublicFiles($design);
    //     $privateFiles = $this->getPrivateFiles($design);

    //     return response()->json([
    //         'idea_name' => $design->idea_name,
    //         'design_information' => $designInformation,
    //         'public_files' => $publicFiles,
    //         'private_files' => $privateFiles
    //     ], 200);
    // }
    
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

    protected function storePublicFiles(object $request, object $authenticatedUser, object $design, string $idea_name)
    {
        $public_files = $request->file('public_files');
        $modified_idea_name = strtolower(str_replace(' ', '_', $idea_name));
        $image_directory = "public/".$authenticatedUser->username."/".$modified_idea_name."/"."public";
        foreach($public_files as $public_file)
            {
                $filename = $public_file->getClientOriginalName();
                Storage::putFileAs($image_directory, $public_file, $filename);
                $image_temp = Storage::url("public/".$authenticatedUser->username."/".$modified_idea_name."/public/".$filename);
                $this->uploadPublicFiles($filename, $image_temp, $design);
            }
    }

    protected function storePrivateFiles(object $request, object $authenticatedUser, object $design,string $idea_name)
    {
        $private_files = $request->file('private_files');
        $modified_idea_name = strtolower(str_replace(' ', '_', $idea_name));
        $image_directory = "public/".$authenticatedUser->username."/".$modified_idea_name."/"."private";

        foreach($private_files as $private_file)
        {
            $filename = $private_file->getClientOriginalName();
            Storage::putFileAs($image_directory, $private_file, $filename);
            $image_temp = Storage::url("public/".$authenticatedUser->username."/".$modified_idea_name."/private/".$filename);
            $this->uploadPrivateFiles($filename, $image_temp, $design);
        }
    }

    protected function uploadPublicFiles(string $filename, string $image_directory, object $design)
    {
        $designFile = new DesignFile([
                    'file_route' => $image_directory,
                    'is_private' => 0,
                ]);
        $this->saveDesign($designFile, $design);
    }

    protected function uploadPrivateFiles(string $filename, string $image_directory, object $design)
    {
        $designFile = new DesignFile([
                    'file_route' => $image_directory,
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
