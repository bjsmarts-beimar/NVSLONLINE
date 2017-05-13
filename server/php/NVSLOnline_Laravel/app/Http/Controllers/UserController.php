<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use NVSLOnline\User;
Use Hash;
use DB;

class UserController extends Controller
{
    public function store(Request $request){
		
		if($request){
            
			$objUser = new User; 
			$objUser -> name = $request->username;
            $objUser -> email = $request->email;
            //$objUser -> password = $request->password;
			$objUser -> password = Hash::make($request->password);
			$objUser -> save();

            return response()->json($objUser);
		}
	}

    public function authenticateUser(Request $request){
		if($request){
            $user = $request->username;
            $email = $request->email;
            $password = $request->password;
            if (Auth::attempt(['email'=>$email, 'password'=>$password])) {
                 return response()->json(true);
            }else {

                if (Auth::attempt(['name'=>$user, 'password'=>$password])) {
                    return response()->json(true);
                }else {
                    return response()->json(false);
                }
            }
		}
	}
}
