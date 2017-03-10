<?php

namespace NVSLOnline;
use NVSLOnline\Division;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
	//con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;
	
	protected $table = 'Teams';

	protected $primaryKey = 'Id';

	public $timestamps = false;

	protected $fillable =[
		'TeamName',
		'IsHidden',
		'DivisionId'
	];
	
 	//public $Division = Division;

	 public function Division(){
		 return $this->hasOne(Division::class,'Id','DivisionId');
	 }
	
	
}
