<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Schedule;
use DB;

class ScheduleController extends Controller
{
    public function index(){
			
		$schedules = Schedule::with('Season','Division','Venue','HomeTeam','AwayTeam')
		//->where('IsHidden','=','false')
		//->select('*')
		->get();

		/*$tes = $schedules::where('IsHidden','=','false')
		->select('Id','season')
		->get();*/

		/*$schedules = Schedule::with(['Season' =>function($query){
			$query->select('Id');
		}])->get();*/
		//$schedules = Schedule::all();
		
		/*$schedules = Schedule::select('*')
		->with(['HomeTeam'=>function($query){
			$query->addSelect('*');
		}]

		)
		->get()
		->toArray();*/
//print_r($schedules);
				return response()->json($schedules);
    }

	public function store(Request $request){
		if($request){
			$objSchedule = new Schedule; 
			$objSchedule -> Status = $request->Status;
			$objSchedule -> DateTime = $request->DateTime;
			$objSchedule -> Score = $request->Score;
			$objSchedule -> IsHidden = 0;
			$objSchedule -> AwayTeamId = $request->AwayTeamId;
			$objSchedule -> DivisionId = $request->DivisionId;
			$objSchedule -> HomeTeamId = $request->HomeTeamId;
			$objSchedule -> SeasonId = $request->SeasonId;
			$objSchedule -> VenueId = $request->VenueId;
			
			//$objDivision -> IsHidden = $request->IsHidden;
			$objSchedule -> save();
			return response()->json([
						"msg" => "Success",
						"id" => $objSchedule->Id
						],200
					);
		}
	}

	public function editScheduleScore(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objSchedule = Schedule::find($id);
		$objSchedule -> GoalsHomeTeam = $request->GoalsHomeTeam;
		$objSchedule -> GoalsAwayTeam = $request->GoalsAwayTeam;
		$objSchedule -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objSchedule->Id
					],200
				);
	}
}
