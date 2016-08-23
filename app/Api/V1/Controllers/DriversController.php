<?php

namespace App\Api\V1\Controllers;

use App\Driver;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Api\V1\Transformers\DriversTransformer;

/**
 * @Resource('Drivers', uri='/drivers')
 */
class DriversController extends BaseController
{
  public function index()
  {
    $drivers = Driver::all();

    return $this->collection($drivers, new DriversTransformer);
  }
}
