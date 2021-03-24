<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
