<?php

namespace App\Api\V1\Controllers;

use DB;
use App\Race;
use App\Record;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Api\V1\Transformers\RacesTransformer;

/**
 * @Resource('Races', uri='/races')
 */
class RacesController extends BaseController
{
  public function index()
  {
    $races = Race::all();

    return $this->collection($races, new RacesTransformer);
  }

  public function show($id)
  {
    $race = Race::where('id', $id)->first();

    if ($race) {
      return $this->item($race, new RacesTransformer);
    }

    return $this->response->errorNotFound();
  }

  public function store(Requests\StoreRaceRequest $request)
  {
    try {
      $filename = '';

      if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $filename = time() . '_' . preg_replace('/[^-\w]+/i', '_', $request->name);
        $file->move(public_path() . '/img/races/', $filename);
      }

      $race = Race::create([
        'name' => $request->name,
        'description' => $request->description,
        'venue' => $request->venue,
        'date' => $request->date,
        'time' => $request->time,
        'photo' => $filename
      ]);

      return $this->item($race, new RacesTransformer);
    } catch (\Exception $e) {
      return $this->response->errorBadRequest();
    }
  }

  public function update(Requests\UpdateRaceRequest $request, $id)
  {
    try {
      $race = Race::findOrFail($id);

      // Check if the user has removed a photo
      $filename = ($request->photo === '') ? '' : $request->photo;

      if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $filename = time() . '_' . preg_replace('/[^-\w]+/i', '_', $request->name);
        $file->move(public_path() . '/img/races/', $filename);
      }

      $race->name = $request->name;
      $race->description = $request->description;
      $race->venue = $request->venue;
      $race->circuit = $request->circuit;
      $race->date = $request->date;
      $race->time = $request->time;
      $race->weather = $request->weather;
      $race->photo = $filename;
      $race->save();

      return $this->item($race, new RacesTransformer);
    } catch (\Exception $e) {
      return $this->response->errorBadRequest();
    }
  }

  public function destroy($id)
  {
    try {
      $race = Race::find($id);
      $race->delete();

      return $this->response->noContent();
    } catch (\Exception $e) {
      return $this->response->errorInternal();
    }
  }

  public function updateDrivers(Request $request, $id)
  {
    $addedIds = $request->addedIds;
    $removedIds = $request->removedIds;

    foreach($addedIds as $driverId) {
      $record = new Record;
      $record->race_id = $id;
      $record->driver_id = $driverId;
      $record->save();
    }

    foreach($removedIds as $driverId) {
      Record::where('race_id', $id)->where('driver_id', $driverId)->delete();
    }

    $race = Race::with('records.driver')->findOrFail($id);

    return response()->json($race);
  }

  public function updateRecords(Request $request, $id)
  {
    $records = $request->records;

    foreach($records as $record) {
      DB::table('records')
        ->where('race_id', $id)
        ->where('driver_id', $record['driver_id'])
        ->update([
          'qualOne' => $record['qualOne'],
          'qualTwo' => $record['qualTwo'],
          'raceOne' => $record['raceOne'],
          'raceOneGroup' => $record['raceOneGroup'],
          'raceTwo' => $record['raceTwo'],
          'raceTwoGroup' => $record['raceTwoGroup']
        ]);
    }

    $race = Race::findOrFail($id);

    return response()->json($race);
  }
}
