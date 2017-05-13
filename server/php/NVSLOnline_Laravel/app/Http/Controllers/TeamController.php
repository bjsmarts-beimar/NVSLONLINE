<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Team;
use DB;

class TeamController extends Controller
{
    public function index(){
		$teams = Team::with('Division','Season')
		->where('IsHidden','=','false')
		->orderBy('Id','ASC')
		->get();

		return response()->json($teams);
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
			$objTeam -> SeasonId = $request->SeasonId;
			$objTeam -> save();
			return response()->json($objTeam);
			
		}
	}

	public function update(Request $request,$id){
		$objTeam = Team::find($id);
		$objTeam -> TeamName = $request->TeamName;
		//$objTeam -> IsHidden = 0;
		$objTeam -> DivisionId = $request->DivisionId;
		$objTeam -> SeasonId = $request->SeasonId;
		$objTeam -> save();
		return response()->json($objTeam);
		
	}
	public function updateDelete($id){
		$objTeam = Team::find($id);
		$objTeam -> IsHidden = 1;
		$objTeam -> save();
		return response()->json($objTeam);
	}
	public function destroy($id){
		$objTeam = Team::find($id)->delete();
		return 'Record  successfully deleted';
	}
}
