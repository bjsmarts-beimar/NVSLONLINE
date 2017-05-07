<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Venue;
use DB;

class VenueController extends Controller
{
        public function index(){
     	$venues = DB::table('Venues')
				->where('IsHidden','=','false')
				->orderBy('Id','ASC')
				->get();
		
				return response()->json($venues);
	}

	public function store(Request $request){
		
		if($request){
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
