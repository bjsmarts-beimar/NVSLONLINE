<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Venue;

class VenuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $venues = [
            [
                'VenueName' => 'Jackson MS',
                'IsHidden' => false
            ],
            [
                'VenueName' => 'Franconia #4',
                'IsHidden' => false
            ],
            [
                'VenueName' => 'Robinson Auxiliary',
                'IsHidden' => false
            ],
            [
                'VenueName' => 'Robinson Stadium',
                'IsHidden' => false
            ],
            [
                'VenueName' => 'Annadale HS',
                'IsHidden' => false
            ],
            [
                'VenueName' => 'Arrowhead Park #3',
                'IsHidden' => false
            ],
            [
                'VenueName' => 'Wakefield #5',
                'IsHidden' => false
            ]
        ];

        foreach ($venues as $venue) {
            Venue::create($venue);
        }
    }
}
