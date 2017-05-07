<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Player;
use DB;

class PlayerController extends Controller
{
    public function index(){
				$players = Player::with('Team')
				//$players = DB::table('Players')
				->where('IsHidden','=','false')
				->orderBy('Id','ASC')
				->get();
				return response()->json($players);
    }

	public function store(Request $request){
		
		if($request){
			$objPlayer = new Player; 
			$objPlayer -> FirstName = $request->FirstName;
			$objPlayer -> LastName = $request->LastName;
			$objPlayer -> TeamId = $request->TeamId;
			$objPlayer -> IsHidden = 0;
			//$objDivision -> IsHidden = $request->IsHidden;
			$objPlayer -> save();
			return response()->json($objPlayer);
		}
	}

	public function update(Request $request,$id){
		$objPlayer = Player::find($id);
		$objPlayer -> FirstName = $request->FirstName;
		$objPlayer -> LastName = $request->LastName;
		$objPlayer -> TeamId = $request->TeamId;
		$objPlayer -> save();
		return response()->json($objPlayer);
	}

	public function updateDelete($id){
		$objPlayer = Player::find($id);
		$objPlayer -> IsHidden = 1;
		$objPlayer -> save();
		return response()->json($objPlayer);
	}

	public function getPlayersByTemId($id){
				$players = DB::table('Players')
				->where('IsHidden','=','false')
				->where('TeamId','=',$id)
				->orderBy('Id','ASC')
				->get();
				return response()->json($players);
    }
}
