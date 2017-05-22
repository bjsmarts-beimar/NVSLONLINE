<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Venue;
use DB;
use Config;

class VenueController extends Controller
{
	function __construct(){
		$this->exists = Config::get('parameters.exists.exists');
		$this->status = Config::get('parameters.exists.status');
	}

    public function index(){
     	$venues = DB::table('Venues')
				->where('IsHidden','=','false')
				->orderBy('Id','ASC')
				->get();
		
				return response()->json($venues);
	}

	public function store(Request $request){
		
		if($request){
			$venue = Venue::where([
				['VenueName','=',$request->VenueName],
				['IsHidden','=',false]
			])->first();

			if ($venue) {
				return response()->json($this->exists,$this->status);
			}

			$objVenue = new Venue; 
			$objVenue -> VenueName = $request->VenueName;
			$objVenue -> IsHidden = 0;
			//$objDivision -> IsHidden = $request->IsHidden;
			$objVenue -> save();
			return response()->json($objVenue);
		}
	}

	public function update(Request $request,$id){
		$objVenue = Venue::find($id);

		$venue = Venue::where([
				['VenueName','=',$request->VenueName],
				['IsHidden','=',false]
			])->first();
		
		if ($venue) {
			if ($request->VenueName != $objVenue->VenueName) {
				return response()->json($this->exists,$this->status);
			}
		}

		$objVenue -> VenueName = $request->VenueName;
		$objVenue -> save();
		return response()->json($objVenue);
	}
	public function updateDelete($id){
		$objVenue = Venue::find($id);
		$objVenue -> IsHidden = 1;
		$objVenue -> save();
		return response()->json($objVenue);
	}
}
