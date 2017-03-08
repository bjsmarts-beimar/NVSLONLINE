<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Division;
use DB;

class PlayerController extends Controller
{
    public function index(){
				$players = DB::table('Players')
				->where('IsHidden','=','false')
				->get();

				return response()->json([
					"msg" => "Success",
					"players" => $players
					],200
				);
    }
}
