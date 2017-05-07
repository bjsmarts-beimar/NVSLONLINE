<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\News;
use DB;

class NewsController extends Controller
{
    public function index(){
				$news = DB::table('News')
				->where('IsHidden','=','false')
                ->orderBy('modified','DESC')
				->get();

		return response()->json($news);		
	}

    public function store(Request $request){
		
		if($request){
			$objNews = new News; 
			$objNews -> title = $request->title;
            $objNews -> description = $request->description;
            
			$objNews -> IsHidden = 0;
            $objNews -> created = DB::raw('NOW()');
            $objNews -> modifiedBy = $request->modifiedBy;
            $objNews -> modified = DB::raw('NOW()');
            $objNews -> modifiedByfullName = $request->modifiedByfullName;
			//$objDivision -> IsHidden = $request->IsHidden;
			$objNews -> save();

            return response()->json($objNews);
		}
	}

    public function update(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objNews = News::find($id);
		$objNews -> title = $request->title;
        $objNews -> description = $request->description;
            
		$objNews -> IsHidden = 0;
        $objNews -> modifiedBy = $request->modifiedBy;
        $objNews -> modified = DB::raw('NOW()');
        $objNews -> modifiedByfullName = $request->modifiedByfullName;
		$objNews -> save();
        return response()->json($objNews);
		
	}
	public function updateDelete($id){
		$objNews = News::find($id);
		$objNews -> IsHidden = 1;
		$objNews -> save();
        return response()->json($objNews);
		
	}

}
