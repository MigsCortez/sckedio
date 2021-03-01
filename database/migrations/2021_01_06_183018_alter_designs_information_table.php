<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDesignsInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('designs_information', function (Blueprint $table) {
            $table->dropColumn(['type', 'public_file', 'private_file', 'stock_type']);
            $table->foreignId('stock_type_id')->before('created_at');
            $table->foreign('stock_type_id')->references('id')->on('stock_types');
            $table->foreignId('idea_type_id')->before('created_at');
            $table->foreign('idea_type_id')->references('id')->on('idea_types');
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
            $table->string('type');
            $table->string('public_file');
            $table->string('private_file');
            $table->string('stock_type');
            $table->dropForeign('designs_information_stock_type_id_foreign');
            $table->dropForeign('designs_information_idea_type_id_foreign');
            $table->dropColumn('stock_type_id');
            $table->dropColumn('idea_type_id');
        });
    }
}
