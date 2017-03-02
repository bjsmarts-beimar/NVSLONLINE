<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get("division", "DivisionController@index");
Route::get("division/{id}", "DivisionController@show");
Route::post("division", "DivisionController@store");
Route::put("division/{id}", "DivisionController@update");
Route::delete("division/{id}", "DivisionController@updateDelete");
Route::delete("division/destroy/{id}", "DivisionController@destroy");

Route::get("team", "TeamController@index");
Route::get("team/{id}", "TeamController@show");
Route::post("team", "TeamController@store");
Route::put("team/{id}", "TeamController@update");
Route::delete("team/{id}", "TeamController@updateDelete");
Route::delete("team/destroy/{id}", "TeamController@destroy");

Route::get("season", "SeasonController@index");
Route::get("season/inactive", "SeasonController@inactiveSeason");
Route::get("season/{id}", "SeasonController@show");
Route::post("season", "SeasonController@store");
Route::put("season/{id}", "SeasonController@update");
Route::delete("season/{id}", "SeasonController@destroy");

Route::get("venue", "VenueController@index");
Route::get("venue/{id}", "VenueController@show");
Route::post("venue", "VenueController@store");
Route::put("venue/{id}", "VenueController@update");
Route::delete("venue/{id}", "VenueController@destroy");

Route::get("standings", "StandingController@index");

Route::get("schedules", "ScheduleController@index");