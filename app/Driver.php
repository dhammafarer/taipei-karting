<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
  protected $fillable = [ 'name', 'country', 'month', 'photo' ];
}
