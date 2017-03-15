<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class VenueController extends Controller
{
        public function index(){
     	$venues = DB::table('Venues')
				->where('IsHidden','=','false')
				->get();
		
				return response()->json([
					"msg" => "Success",
					"venues" => $venues
					],200
				);
	}
}
