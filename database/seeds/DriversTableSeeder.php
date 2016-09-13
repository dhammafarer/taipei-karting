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
        ['name' => 'German',   'country' => 'VN', 'month'=> 5, 'photo' => 'German.jpg'],
        ['name' => 'Felipe',   'country' => 'ES', 'month'=> 7, 'photo' => 'Felipe.jpg'],
        ['name' => 'Fernando', 'country' => 'ES', 'month'=> 6, 'photo' => 'Fernando.jpg'],
        ['name' => 'Pawel',    'country' => 'PL', 'month'=> 6, 'photo' => 'Pawel.jpg'],
        ['name' => 'Marcelo',  'country' => 'BR', 'month'=> 6, 'photo' => 'Marcelo.jpg'],
        ['name' => 'Robson',   'country' => 'BR', 'month'=> 7, 'photo' => 'Robson.jpg'],
        ['name' => 'Javier',   'country' => 'ES', 'month'=> 7, 'photo' => 'Javier.jpg'],
        ['name' => 'Deniz',    'country' => 'TR', 'month'=> 7, 'photo' => 'Deniz.jpg'],
        ['name' => 'Alberto',  'country' => 'ES', 'month'=> 7, 'photo' => 'Alberto.jpg'],
      );

      foreach ($drivers as $driver)
      {
        Driver::create($driver);
      }

      Model::reguard();
    }
}
