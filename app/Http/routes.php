<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['middleware' => 'cors', 'namespace' => 'App\Api\V1\Controllers'], function ($api) {

  // Authentication Routes
  $api->post('authenticate', 'AuthenticateController@authenticate');
  $api->post('logout', 'AuthenticateController@logout');
  $api->get('token', 'AuthenticateController@getToken');

  //Races Routes
  $api->get('races', 'RacesController@index');
  $api->get('races/{id}', 'RacesController@show');

  //Drivers Routes
  $api->get('drivers', 'DriversController@index');
  $api->get('drivers/{id}', 'DriversController@show');

  //Restricted routes
  $api->group(['middleware' => 'api.auth'], function($api) {
    $api->get('authenticated-user', 'AuthenticateController@autenticatedUser');
    //Races
    $api->post('races', 'RacesController@store');
    $api->patch('races/{id}', 'RacesController@update');
    $api->delete('races/{id}', 'RacesController@destroy');
    $api->post('races/{id}/update-drivers', 'RacesController@updateDrivers');
    $api->post('races/{id}/update-records', 'RacesController@updateRecords');
    //Drivers
    $api->post('drivers', 'DriversController@store');
    $api->patch('drivers/{id}', 'DriversController@update');
    $api->delete('drivers/{id}', 'DriversController@destroy');
    $api->post('drivers/check-name', 'DriversController@checkName');
  });
});
