<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
    protected $fillable = ['name', 'description', 'date', 'time', 'photo'];

    public function records()
    {
      return $this->hasMany(Record::class);
    }
}
