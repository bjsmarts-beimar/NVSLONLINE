<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
    //con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;
	
    protected $table = 'Standings';

	protected $primaryKey = 'Id';
	
	public $timestamps = false;

	protected $fillable =[
		'Wins',
		'Losses',
		'Ties',
		'Points',
		'GoalsFor',
		'GoalsAgainst',
		'IsHidden',
		'DivisionId',
		'TeamId'
	];

	public function Division(){
		 return $this->hasOne(Division::class,'Id','DivisionId');
	 }

	 public function Team(){
		 return $this->hasOne(Team::class,'Id','TeamId');
	 }
}
