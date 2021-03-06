<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RacesTableSeeder::class);
        $this->call(RecordsTableSeeder::class);
        $this->call(DriversTableSeeder::class);
        $this->call(UsersTableSeeder::class);
    }
}
