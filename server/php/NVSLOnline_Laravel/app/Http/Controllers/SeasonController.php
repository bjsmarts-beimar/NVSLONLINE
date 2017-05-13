<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Season;
use DB;
use Carbon\Carbon;

class SeasonController extends Controller
{
      public function index(){
     	$seasons = DB::table('Seasons')
				->where('IsHidden','=','false')
				->orderBy('Id','ASC')
				->get();
		
				return response()->json($seasons);
	}

	public function inactiveSeason(){
     	$seasons = DB::table('Seasons')
				->where('IsHidden','=','false')
				->where('Active','=','false')
				->get();
		
				return response()->json($seasons);
	}

	public function show($id){
		$season = \NVSLOnline\Season::find($id);
		return response()->json($season);
	}
	
	public function store(Request $request){
		$objSeason = New Season(); 
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
		$objSeason -> SeasonStart = $request->SeasonStart;
		$objSeason -> SeasonEnd = $request->SeasonEnd;
		$objSeason -> save();
		print(objSeason);
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
