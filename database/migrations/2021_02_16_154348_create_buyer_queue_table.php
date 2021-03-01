<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuyerQueueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buyer_queue', function (Blueprint $table) {
            $table->id();
            $table->foreign('buyer_id')->references('id')->on('users');
            $table->foreignId('buyer_id');
            $table->foreign('design_id')->references('id')->on('designs');
            $table->foreignId('design_id');
            $table->boolean('is_active');
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
        Schema::dropIfExists('buyer_queue');
    }
}
