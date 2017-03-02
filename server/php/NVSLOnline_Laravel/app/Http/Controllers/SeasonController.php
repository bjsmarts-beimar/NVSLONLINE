<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Http\Requests;
use NVSLOnline\Season;
use Illuminate\Support\Facades\Redirect;
use DB;

class SeasonController extends Controller
{
     public function index(){
     	$seasons = DB::table('Seasons')
				->where('IsHidden','=','false')
				->get();
		
				return response()->json([
					"msg" => "Success",
					"season" => $seasons
					],200
				);
	}

	public function inactiveSeason(){
     	$seasons = DB::table('Seasons')
				->where('IsHidden','=','false')
				->where('Active','=','false')
				->get();
		
				return response()->json([
					"msg" => "Success",
					"season" => $seasons
					],200
				);
	}

	public function show($id){
		$season = \NVSLOnline\Season::find($id);
		return response()->json([
					"msg" => "Success",
					"season" => $season
					],200
				);
	}
	
	public function create(){

	}
	public function store(Request $request){
		$objSeason = Season(); 
		$objSeason -> SeasonName = $request->SeasonName;
		$objSeason -> Active = $request->Active;
		$objSeason -> IsHidden = 0;
		$objSeason -> SeasonStart = $request->SeasonStart;
		$objSeason -> SeasonEnd = $request->SeasonEnd;
		$objSeason -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objSeason->Id
					],200
				);
	}
	
	public function update(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objSeason = Season::find($id);
		$objSeason -> SeasonName = $request->SeasonName;
		$objSeason -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objSeason->Id
					],200
				);
	}
	public function updateDelete($id){
		$objSeason = Season::find($id);
		$objSeason -> IsHidden = 1;
		$objSeason -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objSeason->Id
					],200
				);
	}

	public function editSeasonActive(Request $request,$id){
		$objSeason = Season::find($id);
		$objSeason -> Active = $request->Active;
		$objSeason -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objSeason->Id
					],200
				);
	}
}
