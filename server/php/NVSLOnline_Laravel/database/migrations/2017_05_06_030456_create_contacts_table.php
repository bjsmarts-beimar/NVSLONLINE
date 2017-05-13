<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('Contacts', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('yourName');
            $table->string('email');
            $table->string('message',1500);
            
            $table->boolean('IsHidden')->default(false);
            $table->integer('requestSubject');
            $table->dateTime('created');
            $table->string('modifiedBy')->nullable();;
            $table->string('modifiedByfullName')->nullable();;
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
        Schema::drop('Contacts');
    }
}
