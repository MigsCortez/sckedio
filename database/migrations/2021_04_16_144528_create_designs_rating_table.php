<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesignsRatingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('design_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreign('design_id')->references('id')->on('designs');
            $table->foreignId('design_id')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreignId('user_id')->onDelete('cascade');
            $table->double('rate', 3, 2);
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
        Schema::dropIfExists('designs_rating');
    }
}
