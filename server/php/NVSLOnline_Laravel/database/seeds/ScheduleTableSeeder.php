<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Schedule;
use Carbon\Carbon;

class ScheduleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $schedules = [
            [
                'SeasonId' => '1',
                'DivisionId' => '1',
                'VenueId' => '1',
                'Status' => 'Played',
                'DateTime' => Carbon::createFromDate(2016,02,31)->toDateTimeString(),
                'HomeTeamId' => '3',
                'GoalsHomeTeam' => '1',
                'AwayTeamId' => '5',
                'GoalsAwayTeam' => '5',
                'IsHidden' => false
                
            ],
            [
                'SeasonId' => '1',
                'DivisionId' => '2',
                'VenueId' => '2',
                'Status' => 'Played',
                'DateTime' => Carbon::createFromDate(2017,02,31)->toDateTimeString(),
                'HomeTeamId' => '2',
                'GoalsHomeTeam' => '10',
                'AwayTeamId' => '3',
                'GoalsAwayTeam' => '1',
                'IsHidden' => false
            ],
            [
                'SeasonId' => '2',
                'DivisionId' => '3',
                'VenueId' => '3',
                'Status' => 'Forfeited',
                'DateTime' => Carbon::createFromDate(2017,03,31)->toDateTimeString(),
                'HomeTeamId' => '1',
                'GoalsHomeTeam' => '1',
                'AwayTeamId' => '2',
                'GoalsAwayTeam' => '0',
                'IsHidden' => false
            ]
        ];

        foreach ($schedules as $schedule) {
            Schedule::create($schedule);
        }
    }
}
