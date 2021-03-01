<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTotalCostColumnInDesignsInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('designs_information', function (Blueprint $table) {
            $table->renameColumn('total_cost', 'design_cost');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('designs_information', function (Blueprint $table) {
            $table->renameColumn('design_cost', 'total_cost');
        });
    }
}
