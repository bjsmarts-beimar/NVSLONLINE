<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Team;

class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $teams = [
            [
                'TeamName' => 'Benchwarmers',
                'IsHidden' => false,
                'DivisionId' => 1,
                'SeasonId'=> 1
            ],
            [
                'TeamName' => 'FC Turan',
                'IsHidden' => false,
                'DivisionId' => 1,
                'SeasonId'=> 1
            ],
            [
                'TeamName' => 'Pharaoh FC',
                'IsHidden' => false,
                'DivisionId' => 1,
                'SeasonId'=> 1
            ],
            [
                'TeamName' => 'TFC Gunners',
                'IsHidden' => false,
                'DivisionId' => 1,
                'SeasonId'=> 2
            ],
            [
                'TeamName' => 'Arlington Arsenal',
                'IsHidden' => false,
                'DivisionId' => 2,
                'SeasonId'=> 2
            ],
            [
                'TeamName' => 'Benchwarmers 30',
                'IsHidden' => false,
                'DivisionId' => 2,
                'SeasonId'=> 1
            ],
            [
                'TeamName' => 'Braddock FC',
                'IsHidden' => false,
                'DivisionId' => 2,
                'SeasonId'=> 3
            ],
            [
                'TeamName' => 'Murphys',
                'IsHidden' => false,
                'DivisionId' => 2,
                'SeasonId'=> 3
            ],
            [
                'TeamName' => 'Real Ballers FC',
                'IsHidden' => false,
                'DivisionId' => 2,
                'SeasonId'=> 3
            ],
            [
                'TeamName' => 'Smoking Aces',
                'IsHidden' => false,
                'DivisionId' => 2,
                'SeasonId'=> 1
            ]
        ];

        foreach ($teams as $team) {
            Team::create($team);
        }
    }
}
