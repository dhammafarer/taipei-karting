<?php

namespace App\Api\V1\Transformers;

use App\Record;
use League\Fractal\TransformerAbstract;
use App\Api\V1\Transformers\DriversTransformer;

class RecordsTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
      'driver'
    ];

    public function transform(Record $record)
    {
        return [
            'id'            => (int) $record->id,
            'race_id'       => (int) $record->record_id,
            'driver_id'     => (int) $record->driver_id,
            'qualOne'       => $record->qualOne,
            'qualTwo'       => $record->qualTwo,
            'raceOne'       => (int) $record->raceOne,
            'raceOneGroup'  => $record->raceOneGroup,
            'raceTwo'       => (int) $record->raceTwo,
            'raceTwoGroup'  => $record->raceTwoGroup,
        ];
    }

    public function includeDriver(Record $record)
    {
      if ($driver = $record->driver) {
        return $this->item($driver, new DriversTransformer);
      }
    }

}
