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
  public function it_praises_the_races()
  {
      $this->get('/api/races')
          ->seeJson([
              'Races' => 'Every month!'
          ]);
  }
}
