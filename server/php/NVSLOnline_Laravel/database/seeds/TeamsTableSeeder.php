<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Team;

class TeamsTableSeeder extends Seeder
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
                'DivisionId' => 1
            ],
            [
                'TeamName' => 'FC Turan',
                'IsHidden' => false,
                'DivisionId' => 1
            ],
            [
                'TeamName' => 'Pharaoh FC',
                'IsHidden' => false,
                'DivisionId' => 1
            ],
            [
                'TeamName' => 'TFC Gunners',
                'IsHidden' => false,
                'DivisionId' => 1
            ],
            [
                'TeamName' => 'Arlington Arsenal',
                'IsHidden' => false,
                'DivisionId' => 2
            ],
            [
                'TeamName' => 'Benchwarmers 30',
                'IsHidden' => false,
                'DivisionId' => 2
            ],
            [
                'TeamName' => 'Braddock FC',
                'IsHidden' => false,
                'DivisionId' => 2
            ],
            [
                'TeamName' => 'Murphys',
                'IsHidden' => false,
                'DivisionId' => 2
            ],
            [
                'TeamName' => 'Real Ballers FC',
                'IsHidden' => false,
                'DivisionId' => 2
            ],
            [
                'TeamName' => 'Smoking Aces',
                'IsHidden' => false,
                'DivisionId' => 2
            ]
        ];

        foreach ($teams as $team) {
            Team::create($team);
        }
    }
}
