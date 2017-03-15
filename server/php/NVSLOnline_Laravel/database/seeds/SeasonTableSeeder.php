<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Season;
use Carbon\Carbon;

class SeasonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
         $seasons = [
            [
                'SeasonName' => 'Spring 2016',
                'Active' => false,
                'IsHidden' => false,
                'SeasonStart' => Carbon::createFromDate(2016,01,02)->toDateTimeString(),
                'SeasonEnd' => Carbon::createFromDate(2016,02,31)->toDateTimeString()
            ],
            [
                'SeasonName' => 'Summer 2016',
                'Active' => false,
                'IsHidden' => false,
                'SeasonStart' => Carbon::createFromDate(2016,03,01)->toDateTimeString(),
                'SeasonEnd' => Carbon::createFromDate(2016,04,31)->toDateTimeString()
            ],
            [
                'SeasonName' => 'Fall 2017',
                'Active' => true,
                'IsHidden' => false,
                'SeasonStart' => Carbon::createFromDate(2016,05,01)->toDateTimeString(),
                'SeasonEnd' => Carbon::createFromDate(2016,06,31)->toDateTimeString()
            ]
        ];

        foreach ($seasons as $season) {
            Season::create($season);
        }
    }
}
