<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Contact;
use DB;

class ContactController extends Controller
{
    public function index(){
				$contacts = DB::table('Contacts')
				->where('IsHidden','=','false')
                ->orderBy('Id','ASC')
				->get();

		return response()->json($contacts);		
	}

    public function store(Request $request){
		
		if($request){
			$objContacts = new Contact; 
			$objContacts -> yourName = $request->yourName;
            $objContacts -> email = $request->email;
            $objContacts -> message = $request->message;
            
			$objContacts -> IsHidden = 0;
            $objContacts -> requestSubject = $request->requestSubject;
            
            $objContacts -> created = DB::raw('NOW()');
            $objContacts -> modifiedBy = $request->modifiedBy;
            $objContacts -> modified = DB::raw('NOW()');
            $objContacts -> modifiedByfullName = $request->modifiedByfullName;
			//$objDivision -> IsHidden = $request->IsHidden;
			$objContacts -> save();

            return response()->json($objContacts);
		}
	}

    public function update(Request $request,$id){
		//$objDivision = Division::find($request->Id);
		$objContacts = Contact::find($id);
		$objContacts -> yourName = $request->yourName;
        $objContacts -> email = $request->email;
        $objContacts -> message = $request->message;
            
		$objContacts -> IsHidden = 0;
        $objContacts -> requestSubject = $request->requestSubject;
        $objContacts -> modifiedBy = $request->modifiedBy;
        $objContacts -> modified = DB::raw('NOW()');
        $objContacts -> modifiedByfullName = $request->modifiedByfullName;
		$objContacts -> save();
        return response()->json($objContacts);
		
	}
	public function updateDelete($id){
		$objContacts = Contact::find($id);
		$objContacts -> IsHidden = 1;
		$objContacts -> save();
        return response()->json($objContacts);
		
	}
}
