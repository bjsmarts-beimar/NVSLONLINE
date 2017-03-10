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

/*Route::head("/api/divisions", function(){
    $r = Response::make("hello");
    $r
    ->header("Access-Control-Allow-Origin", "*")
    //->("Access-Control-Allow-Credentials", "true")
    ->("Access-Control-Request-Method", "GET");
});*/
Route::group([
    'middleware'=>'cors',
    //'namespace'=>$this->namespace,
    'prefix'=>'api',
],function($router){

Route::get("divisions", "DivisionController@index");
Route::get("divisions/{id}", "DivisionController@show");
Route::post("divisions", "DivisionController@store");
Route::put("divisions/{id}", "DivisionController@update");
Route::delete("divisions/{id}", "DivisionController@updateDelete");
Route::delete("divisions/destroy/{id}", "DivisionController@destroy");

Route::get("teams", "TeamController@index");
Route::get("teams/{id}", "TeamController@show");
Route::post("teams", "TeamController@store");
Route::put("teams/{id}", "TeamController@update");
Route::delete("teams/{id}", "TeamController@updateDelete");
Route::delete("teams/destroy/{id}", "TeamController@destroy");

Route::get("seasons", "SeasonController@index");
Route::get("seasons/inactive", "SeasonController@inactiveSeason");
Route::get("seasons/{id}", "SeasonController@show");
Route::post("seasons", "SeasonController@store");
Route::put("seasons/{id}", "SeasonController@update");
Route::delete("seasons/{id}", "SeasonController@destroy");

Route::get("venues", "VenueController@index");
Route::get("venues/{id}", "VenueController@show");
Route::post("venues", "VenueController@store");
Route::put("venues/{id}", "VenueController@update");
Route::delete("venues/{id}", "VenueController@destroy");

//Route::get("standings", "StandingController@index");

Route::get("schedules", "ScheduleController@index");

});
