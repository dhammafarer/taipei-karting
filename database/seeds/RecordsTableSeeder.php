<?php

use App\Record;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RecordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Model::unguard();

      DB::table('records')->truncate();

      $records = array(
        ['race_id' => '1', 'driver_id' => '1', 'qualOne' => '43.11', 'qualTwo' => '42.34', 'raceOne' => '1', 'raceOneGroup' => 'A', 'raceTwo' => '2', 'raceTwoGroup' => 'A'],
        ['race_id' => '1', 'driver_id' => '2', 'qualOne' => '42.49', 'qualTwo' => '43.32', 'raceOne' => '2', 'raceOneGroup' => 'A', 'raceTwo' => '1', 'raceTwoGroup' => 'A'],
        ['race_id' => '1', 'driver_id' => '3', 'qualOne' => '41.49', 'qualTwo' => '46.32', 'raceOne' => '4', 'raceOneGroup' => 'A', 'raceTwo' => '3', 'raceTwoGroup' => 'A'],
        ['race_id' => '1', 'driver_id' => '4', 'qualOne' => '44.49', 'qualTwo' => '42.26', 'raceOne' => '3', 'raceOneGroup' => 'A', 'raceTwo' => '4', 'raceTwoGroup' => 'A'],
        ['race_id' => '2', 'driver_id' => '4', 'qualOne' => '43.11', 'qualTwo' => '42.34', 'raceOne' => '1', 'raceOneGroup' => 'A', 'raceTwo' => '2', 'raceTwoGroup' => 'A'],
        ['race_id' => '2', 'driver_id' => '2', 'qualOne' => '42.49', 'qualTwo' => '43.32', 'raceOne' => '2', 'raceOneGroup' => 'A', 'raceTwo' => '1', 'raceTwoGroup' => 'A'],
        ['race_id' => '2', 'driver_id' => '1', 'qualOne' => '41.49', 'qualTwo' => '46.32', 'raceOne' => '4', 'raceOneGroup' => 'A', 'raceTwo' => '3', 'raceTwoGroup' => 'A'],
        ['race_id' => '2', 'driver_id' => '3', 'qualOne' => '44.49', 'qualTwo' => '42.26', 'raceOne' => '3', 'raceOneGroup' => 'A', 'raceTwo' => '4', 'raceTwoGroup' => 'A']
      );

      foreach ($records as $record)
      {
        Record::create($record);
      }

      Model::reguard();
    }
}
