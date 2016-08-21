<?php

namespace App\Api\V1\Controllers;

use App\Race;
use App\Http\Requests;
use Illuminate\Http\Request;

/**
 * @Resource('Races', uri='/races')
 */
class RacesController extends BaseController
{
  public function index()
  {
    $races = Race::all();

    return $this->response->array(['data' => $races], 200);
  }

}
