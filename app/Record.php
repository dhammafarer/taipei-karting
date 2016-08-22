<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = ['race_id', 'driver_id', 'qual1', 'qual2', 'race1', 'race2'];

    public function driver()
    {
      return $this->belongsTo('App\Driver');
    }
}
