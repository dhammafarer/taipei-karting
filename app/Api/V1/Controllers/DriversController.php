<?php

namespace App\Api\V1\Controllers;

use Image;
use App\Driver;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Api\V1\Transformers\DriversTransformer;

/**
 * @Resource('Drivers', uri='/drivers')
 */
class DriversController extends BaseController
{
  protected $uploadsPath = '/uploads/drivers/';

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
      $filename = $this->savePhotoWithThumbnail($request);

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
      $filename = ($request->photo === '') ? '' : $this->savePhotoWithThumbnail($request);

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

  protected function savePhotoWithThumbnail($request)
  {
      if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $filename = preg_replace('/[^-\w]+/i', '_', $request->name) . '_' . time();
        $file->move(public_path() . $this->uploadsPath, $filename);

        //generate a thumbnail with image/intervention
        $thumbnail = Image::make(public_path() . $this->uploadsPath . $filename)
            ->resize(200, null, function($constraint) {
              $constraint->aspectRatio();
            })
            ->save(public_path() . $this->uploadsPath . 'tb_' . $filename);
        return $filename;
      }
      return $request->photo;
  }
}
