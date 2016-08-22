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
        ['name' => 'German',   'country' => 'VEN', 'photo' => 'German.jpg'],
        ['name' => 'Felipe',   'country' => 'ESP', 'photo' => 'Felipe.jpg'],
        ['name' => 'Fernando', 'country' => 'ESP', 'photo' => 'Fernando.jpg'],
        ['name' => 'Pawel',    'country' => 'POL', 'photo' => 'Pawel.jpg'],
        ['name' => 'Marcelo',  'country' => 'BRA', 'photo' => 'Marcelo.jpg'],
        ['name' => 'Robson',   'country' => 'BRA', 'photo' => 'Robson.jpg'],
        ['name' => 'Javier',   'country' => 'ESP', 'photo' => 'Javier.jpg'],
        ['name' => 'Deniz',    'country' => 'TUR', 'photo' => 'Deniz.jpg'],
        ['name' => 'Alberto',  'country' => 'ESP', 'photo' => 'Alberto.jpg'],
      );

      foreach ($drivers as $driver)
      {
        Driver::create($driver);
      }

      Model::reguard();
    }
}
