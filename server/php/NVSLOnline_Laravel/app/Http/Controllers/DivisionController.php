<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
//use NVSLOnline\Http\Requests;
use NVSLOnline\Division;
//use Illuminate\Support\Facades\Redirect;
use DB;
use Config;

class DivisionController extends Controller
{
	function __construct(){
		$this->exists = Config::get('parameters.exists.exists');
		$this->status = Config::get('parameters.exists.status');
	}
	
	
    public function index(){
				$divisions = DB::table('Divisions')
				->where('IsHidden','=','false')
				->orderBy('Id','ASC')
				->get();

		return response()->json($divisions);		
	}
	
	public function show($id){
		$division = Division::find($id);
		return response()->json([
					"msg" => "Success",
					"division" => $division
					],200
				);
	}

	public function store(Request $request){
		
		if($request){
			$division = Division::where([
				['DivisionName','=',$request->DivisionName],
				['IsHidden','=',false]
			])->first();

			if ($division) {
				return response()->json($this->exists,$this->status);
			}
			
			$objDivision = new Division; 
			$objDivision -> DivisionName = $request->DivisionName;
			$objDivision -> IsHidden = 0;
			//$objDivision -> IsHidden = $request->IsHidden;
			$objDivision -> save();
			return response()->json($objDivision,200);
		}
	}

	public function update(Request $request,$id){
		$objDivision = Division::find($id);

		$division = Division::where([
				['DivisionName','=',$request->DivisionName],
				['IsHidden','=',false]
			])->first();
		
		if ($division) {
			if ($request->DivisionName != $objDivision->DivisionName) {
				return response()->json($this->exists,$this->status);
			}
		}
		
		$objDivision -> DivisionName = $request->DivisionName;
		$objDivision -> save();
		return response()->json($objDivision,200);
	}
	public function updateDelete($id){
		$objDivision = Division::find($id);
		$objDivision -> IsHidden = 1;
		$objDivision -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objDivision->Id
					],200
				);
	}
	public function destroy($id){
		$objDivision = Division::find($id)->delete();
		return 'Record  successfully deleted';
	}
}
