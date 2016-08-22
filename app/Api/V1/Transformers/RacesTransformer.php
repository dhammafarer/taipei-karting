<?php

namespace App\Api\V1\Transformers;

use App\Race;
use League\Fractal\TransformerAbstract;
use App\Api\V1\Transformers\RecordsTransformer;

class RacesTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
      'records'
    ];

    public function transform(Race $race)
    {
        return [
            'id'          => (int) $race->id,
            'name'        => ucfirst($race->name),
            'description' => $race->description,
            'venue'       => $race->venue,
            'circuit'     => $race->circuit,
            'date'        => $race->date,
            'time'        => $race->time,
            'weather'     => $race->weather,
            'photo'       => $race->photo,
        ];
    }

    public function includeRecords(Race $race)
    {
      if ($records = $race->records) {
        return $this->collection($records, new RecordsTransformer);
      }
    }
}
