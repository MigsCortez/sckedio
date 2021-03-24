<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Designer\Design;
use App\Models\Designer\DesignInformation;
use App\Models\Designer\DesignFile;
use App\Models\User;

class DummyDesignSeeder2 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'username' => 'janedoe',
            'email' => 'janedoe@example.com',
            'password' => '1234567890',
        ]);

        $design = Design::create([
            'owner_id' => $user->id,
            'idea_name' => 'Interesting Idea',
        ]);

        DesignInformation::create([
            'design_id' => $design->id,
            'category_id' => 39,
            'design_cost' => 1800,
            'idea_type_id' => 31,
            'description' => 'An interesting idea.'
        ]);

        DesignFile::create([
            'design_id' => $design->id,
            'is_private' => 0,
            'filename' => '014mifuhemm41.jpg',
            'url' => 'https://sckedio-users-files.s3.us-east-2.amazonaws.com/users/jdoe/interesting_idea/public/2021_03_15_014mifuhemm41.jpg'
        ]);
    }
}
