<?php

use App\Driver;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DriversTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Model::unguard();

      DB::table('drivers')->truncate();

      $drivers = array(
        ['name' => 'German',   'country' => 'VN', 'month'=> 1, 'photo' => 'German.jpg'],
        ['name' => 'Felipe',   'country' => 'ES', 'month'=> 1, 'photo' => 'Felipe.jpg'],
        ['name' => 'Fernando', 'country' => 'ES', 'month'=> 1, 'photo' => 'Fernando.jpg'],
        ['name' => 'Pawel',    'country' => 'PL', 'month'=> 2, 'photo' => 'Pawel.jpg'],
        ['name' => 'Marcelo',  'country' => 'BR', 'month'=> 2, 'photo' => 'Marcelo.jpg'],
        ['name' => 'Robson',   'country' => 'BR', 'month'=> 2, 'photo' => 'Robson.jpg'],
        ['name' => 'Javier',   'country' => 'ES', 'month'=> 3, 'photo' => 'Javier.jpg'],
        ['name' => 'Deniz',    'country' => 'TR', 'month'=> 3, 'photo' => 'Deniz.jpg'],
        ['name' => 'Alberto',  'country' => 'ES', 'month'=> 4, 'photo' => 'Alberto.jpg'],
      );

      foreach ($drivers as $driver)
      {
        Driver::create($driver);
      }

      Model::reguard();
    }
}
