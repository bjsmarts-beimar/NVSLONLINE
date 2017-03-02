<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Standing;
use DB;

class StandingController extends Controller
{
    public function index(){
			
		$standings = Standing::with('Division','Team')
		->where('IsHidden','=','false')
		->get();

				return response()->json([
					"msg" => "Success",
					"teams" => $standings->toArray()
					],200
				);
    }
}
