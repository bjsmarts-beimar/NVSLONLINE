<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Schedule;
use DB;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function index(){
			
		$schedules = Schedule::with('Season','Division','Venue','HomeTeam','AwayTeam')
		->where('IsHidden','=','false')
		//->select('*')
		->get();

		return response()->json($schedules);
    }

	public function store(Request $request){
		if($request){

		 $DateTimeGame = Carbon::parse($request->DateTime);
			$objSchedule = new Schedule; 
			$objSchedule -> Status = $request->Status;
			$objSchedule -> DateTime = $DateTimeGame;
			//$objSchedule -> Score = $request->Score;
			
			$objSchedule -> IsHidden = 0;
			$objSchedule -> DivisionId = $request->DivisionId;
			$objSchedule -> HomeTeamId = $request->HomeTeamId;
			$objSchedule -> GoalsHomeTeam = $request->GoalsHomeTeam;
			$objSchedule -> AwayTeamId = $request->AwayTeamId;
			$objSchedule -> GoalsAwayTeam = $request->GoalsAwayTeam;
			$objSchedule -> SeasonId = $request->SeasonId;
			$objSchedule -> VenueId = $request->VenueId;
			
			//$objDivision -> IsHidden = $request->IsHidden;
			$objSchedule -> save();
			return response()->json($objSchedule);
			
		}
	}

	public function update(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objSchedule = Schedule::find($id);

		$objSchedule -> Status = $request->Status;
		$objSchedule -> DateTime = $request->DateTime;
		$objSchedule -> GoalsHomeTeam = $request->GoalsHomeTeam;
		$objSchedule -> GoalsAwayTeam = $request->GoalsAwayTeam;
		$objSchedule -> IsHidden = 0;

		$objSchedule -> DivisionId = $request->DivisionId;
		$objSchedule -> HomeTeamId = $request->HomeTeamId;
		$objSchedule -> AwayTeamId = $request->AwayTeamId;
		$objSchedule -> SeasonId = $request->SeasonId;
		$objSchedule -> VenueId = $request->VenueId;

		$objSchedule -> save();
		
		return response()->json($objSchedule);
	}


	public function editScheduleScore(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objSchedule = Schedule::find($id);
		$objSchedule -> GoalsHomeTeam = $request->GoalsHomeTeam;
		$objSchedule -> GoalsAwayTeam = $request->GoalsAwayTeam;
		$objSchedule -> Status = "Played";
		$objSchedule -> save();
		
		return response()->json($objSchedule);
	}

	public function updateDelete($id){
		$objSchedule = Schedule::find($id);
		$objSchedule -> IsHidden = 1;
		$objSchedule -> save();
		return response()->json($objSchedule);
	}
}
