<?php

namespace NVSLOnline;
use NVSLOnline\Division;
use NVSLOnline\Team;
use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
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
