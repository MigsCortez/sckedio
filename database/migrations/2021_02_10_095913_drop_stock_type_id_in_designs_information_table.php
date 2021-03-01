<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropStockTypeIdInDesignsInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('designs_information', function (Blueprint $table) {
            $table->dropForeign('designs_information_stock_type_id_foreign');
            $table->dropColumn('stock_type_id');
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
            $table->foreign('stock_type_id')->references('id')->on('stock_types');
            $table->foreignId('stock_type_id')->before('created_at');
        });
    }
}
