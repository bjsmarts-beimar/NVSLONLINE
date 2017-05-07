<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Schedules', function (Blueprint $table) {
            $table->increments('Id');
           
            $table->integer('SeasonId')->unsigned();
            $table->foreign('SeasonId')->references('Id')->on('Seasons');

            $table->integer('DivisionId')->unsigned();
            $table->foreign('DivisionId')->references('Id')->on('Divisions');

            $table->integer('VenueId')->unsigned();
            $table->foreign('VenueId')->references('Id')->on('Venues');

            $table->string('Status');
            $table->dateTime('DateTime');

            $table->integer('HomeTeamId')->unsigned();
            $table->foreign('HomeTeamId')->references('Id')->on('Teams');

            $table->integer('GoalsHomeTeam')->nullable();

            $table->integer('AwayTeamId')->unsigned();
            $table->foreign('AwayTeamId')->references('Id')->on('Teams');

            $table->integer('GoalsAwayTeam')->nullable();

            $table->boolean('IsHidden')->default(false);;

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
        Schema::drop('Schedules');
    }
}
