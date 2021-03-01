<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFileClassificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('file_classifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_id');
            $table->foreign('design_id')->references('id')->on('designs');
            $table->boolean('is_private');
            $table->string('file_route');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('file_classifications');
    }
}
