<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
//use NVSLOnline\Http\Requests;
use NVSLOnline\Division;
//use Illuminate\Support\Facades\Redirect;
use DB;

class DivisionController extends Controller{

	public function index(){
				$divisions = DB::table('Divisions')
				->where('IsHidden','=','false')
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
			$objDivision = new Division; 
			$objDivision -> DivisionName = $request->DivisionName;
			$objDivision -> IsHidden = 0;
			//$objDivision -> IsHidden = $request->IsHidden;
			$objDivision -> save();
			return response()->json([
						"msg" => "Success",
						"id" => $objDivision->Id
						],200
					);
		}
	}

	public function update(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objDivision = Division::find($id);
		$objDivision -> DivisionName = $request->DivisionName;
		$objDivision -> save();
		return response()->json([
					"msg" => "Success",
					"id" => $objDivision->Id
					],200
				);
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

    //
}
