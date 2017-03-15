<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
    {
        Schema::create('Teams', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('TeamName');
            $table->boolean('IsHidden')->default(false);
            $table->integer('DivisionId')->unsigned();
            $table->foreign('DivisionId')->references('Id')->on('Divisions');
            $table->integer('SeasonId')->unsigned();
            $table->foreign('SeasonId')->references('Id')->on('Seasons');
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
        Schema::drop('Teams');
    }
}
