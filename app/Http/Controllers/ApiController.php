<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// TODO
use App\Models\User;
use App\Models\Category;
use App\Models\IdeaType;
use App\Models\Designer\StockType;
class ApiController extends Controller
{
    public function list()
    {
        return User::all();
    }

    public function getCategories()
    {
        $categories = Category::select('id','category')->get();
        return $categories;
    }
    
    public function getIdeaTypes()
    {
        $ideaTypes = IdeaType::select('id', 'idea_type')->get();
        return $ideaTypes;
    }

    public function  getStockTypes()
    {
        $stockTypes = StockType::select('id', 'stock_type')->get();
        return $stockTypes;
    }   
}
