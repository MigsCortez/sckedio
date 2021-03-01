<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCategoryIdColumnInDesignsInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('designs_information', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('categories')->change();
            $table->foreignId('category_id')->before('created_at')->change();
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
            $table->dropForeign('designs_information_category_id_foreign');
        });
    }
}
