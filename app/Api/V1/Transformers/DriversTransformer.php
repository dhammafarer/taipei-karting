<?php

namespace App\Api\V1\Transformers;

use App\Driver;
use League\Fractal\TransformerAbstract;

class DriversTransformer extends TransformerAbstract
{
    public function transform(Driver $driver)
    {
        return [
            'id'          => (int) $driver->id,
            'name'        => $driver->name,
            'country'     => $driver->country,
            'photo'       => $driver->photo
        ];
    }
}
