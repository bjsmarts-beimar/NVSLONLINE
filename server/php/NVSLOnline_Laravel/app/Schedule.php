<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;
use NVSLOnline\Season;
use NVSLOnline\Division;
use NVSLOnline\Venue;
use NVSLOnline\Team;

class Schedule extends Model
{
    protected $table = 'Schedules';

	protected $primaryKey = 'Id';
	
	public $timestamps = false;

	protected $fillable =[
		'SeasonId',
		'DivisionId',
		'VenueId',
		'Status',
		'DateTime',
		'HomeTeamId',
		'GoalsHomeTeam',
		'AwayTeamId',
		'GoalsAwayTeam',
        'IsHidden'
	];

	public function Season(){
		 return $this->hasOne(Season::class,'Id','SeasonId');
	 }
     public function Division(){
		 return $this->hasOne(Division::class,'Id','DivisionId');
	 }
     public function Venue(){
		 return $this->hasOne(Venue::class,'Id','VenueId');
	 }

	 public function HomeTeam(){
		 return $this->hasOne(Team::class,'Id','HomeTeamId');
	 }

     public function AwayTeam(){
		 return $this->hasOne(Team::class,'Id','AwayTeamId');
	 }
}
