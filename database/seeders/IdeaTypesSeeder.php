<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IdeaType;

class IdeaTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        IdeaType::create(['idea_type' => 'Just an idea']);
        IdeaType::create(['idea_type' => 'A few sketches']);
        IdeaType::create(['idea_type' => 'Some detailed drawings']);
        IdeaType::create(['idea_type' => 'Factory-ready design']);
        IdeaType::create(['idea_type' => 'I\'ll make my idea myself!']);
    }
}
