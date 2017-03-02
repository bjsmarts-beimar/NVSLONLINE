<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeasonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Seasons', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('SeasonName');
            $table->boolean('Active')->default(false);;
            $table->boolean('IsHidden')->default(false);;
            $table->dateTime('SeasonStart');
            $table->dateTime('SeasonEnd');
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('Seasons');
    }
}
