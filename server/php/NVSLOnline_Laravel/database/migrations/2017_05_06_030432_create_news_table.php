<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('News', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('title');
            $table->string('description',1500);
            
            $table->boolean('IsHidden')->default(false);
            $table->dateTime('created');
            $table->string('modifiedBy');
            $table->string('modifiedByfullName');
            $table->dateTime('modified');
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
        Schema::drop('News');
    }
}
