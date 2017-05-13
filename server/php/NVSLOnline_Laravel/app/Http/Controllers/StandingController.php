<?php

namespace NVSLOnline\Http\Controllers;

use Illuminate\Http\Request;
use NVSLOnline\Schedule;
use NVSLOnline\Team;
use DB;

class StandingController extends Controller
{
    public function index(){
		$lstStanding = array();

        $teams = $this->getTeams();
                
        foreach ($teams as $team) {
            
            $teamsEnJuego = DB::table('Schedules')
            ->where('Schedules.HomeTeamId','=',$team->Id)
            ->orWhere('Schedules.AwayTeamId','=',$team->Id)
            ->get();
            $standing = array();

            $standing["SeasonId"] = $team->SeasonId;
            $standing["Season"] = $team->Season;
            $standing["DivisionId"] = $team->DivisionId;
            $standing["Division"] = $team->Division;

            $standing["TeamName"] = $team->TeamName;
            $standing["Wins"] = 0;
            $standing["Losses"] = 0;
            $standing["Ties"] = 0;
            $standing["Points"] = 0;
            $standing["GoalsFor"] = 0;
            $standing["GoalsAgainst"] = 0;

            foreach ($teamsEnJuego as $teamEnJuego) {
                if ($teamEnJuego->IsHidden == false) {
                 
                if ($team->Id == $teamEnJuego->HomeTeamId) {
                        $standing["GoalsFor"] += $teamEnJuego->GoalsHomeTeam;
                        $standing["GoalsAgainst"] += $teamEnJuego->GoalsAwayTeam;
                        if ($teamEnJuego->GoalsHomeTeam > $teamEnJuego->GoalsAwayTeam) {
                            $standing["Wins"] += 1;
                            $standing["Points"] += 3;

                        }
                        if ($teamEnJuego->GoalsHomeTeam < $teamEnJuego->GoalsAwayTeam) {
                            $standing["Losses"] += 1;
                        }
                        if ($teamEnJuego->GoalsHomeTeam == $teamEnJuego->GoalsAwayTeam 
                        && $teamEnJuego->GoalsHomeTeam !== null) {
                            $standing["Ties"] += 1;
                            $standing["Points"] += 1;
                        }

                    }
                    else {
                        $standing["GoalsFor"] += $teamEnJuego->GoalsAwayTeam;
                        $standing["GoalsAgainst"] += $teamEnJuego->GoalsHomeTeam;
                        if ($teamEnJuego->GoalsAwayTeam > $teamEnJuego->GoalsHomeTeam) {
                            $standing["Wins"] += 1;
                            $standing["Points"] += 3;

                        }
                        if ($teamEnJuego->GoalsAwayTeam < $teamEnJuego->GoalsHomeTeam) {
                            $standing["Losses"] += 1;
                        }
                        if ($teamEnJuego->GoalsAwayTeam === $teamEnJuego->GoalsHomeTeam 
                        && $teamEnJuego->GoalsHomeTeam !== null) {
                            $standing["Ties"] += 1;
                            $standing["Points"] += 1;
                        }
                    }
            
            
                    }
               
                }

            $standing["Differential"] = $standing["GoalsFor"] - $standing["GoalsAgainst"];
            array_push($lstStanding,$standing);
        }
        return $lstStanding;
    }

    
    public function getTeams(){
		//$teams = DB::table('Teams')
        $teams = Team::with('Division','Season')
		->where([['IsHidden','=','false']])
        
		->get();

		return $teams;
	}
}
