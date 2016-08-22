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

$api->version('v1', ['namespace' => 'App\Api\V1\Controllers'], function ($api) {
  $api->post('authenticate', 'AuthenticateController@authenticate');
  $api->post('logout', 'AuthenticateController@logout');
  $api->get('token', 'AuthenticateController@getToken');

  $api->get('races', 'RacesController@index');
  $api->get('races/{id}', 'RacesController@show');

  $api->group(['middleware' => 'api.auth'], function($api) {
    $api->get('authenticated_user', 'AuthenticateController@autenticatedUser');

    $api->post('races', 'RacesController@store');
    $api->delete('races/{id}', 'RacesController@destroy');
  });
});
