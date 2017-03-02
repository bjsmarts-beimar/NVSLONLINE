<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
//use NVSLOnline\Http\Requests;
use NVSLOnline\Team;
use DB;

class TeamController extends Controller
{
    public function index(){
			/*$teams = DB::table('Teams')
				//->where('DivisionName','LIKE', '%'.query.'%')
				->where('IsHidden','=','false')
				->get();*/
//$teams = Team::get();
		$teams = Team::with('Division')
		->where('IsHidden','=','false')
		->get();

				return response()->json([
					"msg" => "Success",
					"teams" => $teams->toArray()
					],200
				);
	}
	
	public function show($id){
		$team = Team::find($id);
		return response()->json([
					"msg" => "Success",
					"team" => $team
					],200
				);
	}
	
	public function store(Request $request){
		if($request){
			$objTeam = new Team; 
			$objTeam -> TeamName = $request->TeamName;
			$objTeam -> IsHidden = 0;
			$objTeam -> DivisionId = $request->DivisionId;
			$objTeam -> save();
			return response()->json([
						"msg" => "Success",
						"id" => $objTeam->Id
						],200
					);
		}
	}

	public function update(Request $request,$id){
		$objTeam = Team::find($id);
		$objTeam -> TeamName = $request->TeamName;
		//$objTeam -> IsHidden = 0;
		$objTeam -> DivisionId = $request->DivisionId;
		$objTeam -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objTeam->Id
					],200
				);
	}
	public function updateDelete($id){
		$objTeam = Team::find($id);
		$objTeam -> IsHidden = 1;
		$objTeam -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objTeam->Id
					],200
				);
	}
	public function destroy($id){
		$objTeam = Team::find($id)->delete();
		return 'Record  successfully deleted';
	}
}

