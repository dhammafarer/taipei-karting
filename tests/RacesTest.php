<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RacesTest extends TestCase
{
  use DatabaseMigrations;

  /**
    * A basic test example.
    *
    * @return void
    */
  public function testExample()
  {
      $this->assertTrue(true);
  }

  /**
  * @test
  *
  * Test: GET /api.
  */
  public function it_fetches_races()
  {
    $this->seed('RacesTableSeeder');

    $this->get('/api/races')
        ->seeJsonStructure([
          'data' => [
            '*' => [
              'name', 'date', 'time'
            ]
          ]
        ]);
  }
}
