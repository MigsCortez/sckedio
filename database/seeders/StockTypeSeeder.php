<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Designer\StockType;

class StockTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Stock type initial values.
        StockType::create(['stock_type' => 'Limited']);
        StockType::create(['stock_type' => 'Unlimited']);
    }
}
