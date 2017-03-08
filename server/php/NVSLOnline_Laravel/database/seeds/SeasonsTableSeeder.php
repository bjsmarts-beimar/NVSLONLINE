<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Season;

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
                'SeasonStart' => '2016-01-01',
                'SeasonEnd' => '2016-02-31'
            ],
            [
                'SeasonName' => 'Summer 2016',
                'Active' => false,
                'IsHidden' => false,
                'SeasonStart' => '2016-03-01',
                'SeasonEnd' => '2016-04-31'
            ],
            [
                'SeasonName' => 'Fall 2016',
                'Active' => true,
                'IsHidden' => false,
                'SeasonStart' => '2016-05-01',
                'SeasonEnd' => '2016-06-31'
            ]
        ];

        foreach ($seasons as $season) {
            Season::create($season);
        }
    }
}
