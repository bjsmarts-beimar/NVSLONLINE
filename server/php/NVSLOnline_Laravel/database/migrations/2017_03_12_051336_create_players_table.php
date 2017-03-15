<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('Players', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('FirstName');
            $table->string('LastName');
            $table->boolean('IsHidden')->default(false);
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
        Schema::drop('Players');
    }
}
