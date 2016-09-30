<?php

use App\Race;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Model::unguard();

      DB::table('races')->truncate();

      $races = array(
        ['name' => 'Congo GP', 'description' => 'June Grand Prix', 'venue' => 'zhongli', 'date' => '2016-08-19', 'time' => '12:00'],
        ['name' => 'Texas GP', 'description' => 'June Grand Prix', 'venue' => 'zhongli', 'date' => '2016-07-19', 'time' => '12:00'],
        ['name' => 'Cuenca GP', 'description' => 'June Grand Prix', 'venue' => 'zhongli', 'date' => '2016-06-19', 'time' => '12:00'],
        ['name' => 'British GP', 'description' => 'May Grand Prix', 'venue' => 'zhongli', 'date' => '2016-05-15', 'time' => '10:00'],
        ['name' => 'Chinese GP', 'description' => 'April Grand Prix', 'venue' => 'zhongli', 'date' => '2016-04-15', 'time' => '10:00'],
        ['name' => 'Alaskan GP', 'description' => 'March Grand Prix', 'venue' => 'zhongli', 'date' => '2016-03-15', 'time' => '10:00'],
        ['name' => 'Soviet GP', 'description' => 'February Grand Prix', 'venue' => 'zhongli', 'date' => '2016-02-15', 'time' => '10:00']
      );

      foreach ($races as $race) {
        Race::create($race);
      }

      Model::reguard();
    }
}
