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

  public function show($id)
  {
    $driver = Driver::find($id);

    return $this->item($driver, new DriversTransformer);
  }

  public function store(Requests\StoreDriverRequest $request)
  {
    try {
      $filename = '';

      if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $filename = time() . '_' . preg_replace('/[^-\w]+/i', '_', $request->name);
        $file->move(public_path() . '/img/drivers/', $filename);
      }

      $driver = Driver::create([
        'name' => $request->name,
        'country' => $request->country,
        'month' => $request->month,
        'photo' => $filename
      ]);

      return $this->item($driver, new DriversTransformer);
    } catch (\Exception $e) {
      return $this->response->errorBadRequest();
    }
  }

  public function update(Requests\StoreDriverRequest $request, $id)
  {
    try {
      $driver = Driver::findOrFail($id);

      // Check if the user has removed a photo
      $filename = ($request->photo === '') ? '' : $request->photo;

      if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $filename = time() . '_' . preg_replace('/[^-\w]+/i', '_', $request->name);
        $file->move(public_path() . '/img/drivers/', $filename);
      }

      $driver->name = $request->name;
      $driver->country = $request->country;
      $driver->month = $request->month;
      $driver->photo = $filename;
      $driver->save();

      return $this->item($driver, new DriversTransformer);
    } catch (\Exception $e) {
      return $this->response->errorBadRequest();
    }
  }

  public function destroy($id)
  {
    try {
      $driver = Driver::find($id);
      $driver->delete();

      return $this->response->noContent();
    } catch (\Exception $e) {
      return $this->response->errorInternal();
    }
  }

  public function checkName(Request $request)
  {
    $driver = Driver::where('name', $request->name)->first();

    if (!$driver) {
      return $this->response->noContent();
    }
    return $this->response->error('This name has already been taken.', 500);
  }

}
