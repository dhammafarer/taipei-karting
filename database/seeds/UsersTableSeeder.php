<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Model::unguard();

      DB::table('users')->truncate();

      $users = array(
        ['name' => 'test', 'email' => 'test@test.com', 'password' => bcrypt('secret')]
      );

      foreach ($users as $user)
      {
        User::create($user);
      }

      Model::reguard();
    }
}
