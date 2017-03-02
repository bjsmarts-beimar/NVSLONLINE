<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStandingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Standings', function (Blueprint $table) {
            $table->increments('Id');
            $table->integer('Wins');
            $table->integer('Losses');
            $table->integer('Ties');
            $table->integer('Points');
            $table->integer('GoalsFor');
            $table->integer('GoalsAgainst');
    
            $table->boolean('IsHidden')->default(false);;

            $table->integer('DivisionId')->unsigned();
            $table->foreign('DivisionId')->references('Id')->on('Divisions');

            $table->integer('TeamId')->unsigned();
            $table->foreign('TeamId')->references('Id')->on('Teams');
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
        Schema::drop('Standings');
    }
}
