<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDesignFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('design_files', function (Blueprint $table) {
            $table->renameColumn('file_route', 'filename');
            $table->string('url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('design_files', function (Blueprint $table) {
            $table->renameColumn('filename', 'file_route');
            $table->dropColumn('url');
        });
    }
}
