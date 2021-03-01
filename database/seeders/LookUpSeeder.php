<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IdeaType;
use App\Models\FileClassification;
use App\Models\Category;

class LookUpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Idea types values
        IdeaType::create(['idea_type' => 'Just an idea']);
        IdeaType::create(['idea_type' => 'A few sketches']);
        IdeaType::create(['idea_type' => 'Some detailed drawings']);
        IdeaType::create(['idea_type' => 'Factory-ready design']);
        IdeaType::create(['idea_type' => 'I\'ll make my idea myself!']);

        // File classification values
        FileClassification::create(['classification' => 'public']);
        FileClassification::create(['classification' => 'private']);

        // Category values
        Category::create(['category' => 'Clothing/Accessories']);
        Category::create(['category' => 'Toys/Games']);
        Category::create(['category' => 'Technology']);
        Category::create(['category' => 'Transport']);
        Category::create(['category' => 'Furniture/Interior Design']);
        Category::create(['category' => 'Art']);
        Category::create(['category' => 'Home Goods']);
        Category::create(['category' => 'Everyday Use']);
        Category::create(['category' => 'Other']);
    }
}
