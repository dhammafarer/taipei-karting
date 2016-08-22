<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('race_id')->unsigned();
            $table->integer('driver_id')->unsigned();
            $table->time('qualOne')->unsigned()->nullable();
            $table->time('qualTwo')->unsigned()->nullable();
            $table->tinyInteger('raceOne')->unsigned();
            $table->string('raceOneGroup')->nullable();
            $table->tinyInteger('raceTwo')->unsigned()->nullable();
            $table->string('raceTwoGroup')->nullable();
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
        Schema::drop('records');
    }
}
